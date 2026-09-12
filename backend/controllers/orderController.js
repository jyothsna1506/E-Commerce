const Order = require("../models/Order");
const User = require("../models/User");
const { isConnected } = require("../config/db");
const memoryStore = require("../services/storageService");

// Generate readable order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `ORD-${timestamp}-${random}`;
};

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const createOrder = async (req, res, next) => {
  try {
    if (!req.user || (!req.user.id && !req.user._id)) {
      return res.status(401).json({
        success: false,
        error: "Please sign in to place an order.",
      });
    }

    const {
      items,
      shippingAddress,
      paymentMethod = "card",
      subtotal,
      discount = 0,
      couponCode = null,
      shipping = 0,
      total,
    } = req.body;

    const orderId = generateOrderId();
    const userId = req.user.id || req.user._id;

    const normalizedItems = (items || []).map((item) => ({
      ...item,
      selectedVariant: item.selectedVariant || item.size || null,
      size: item.size || item.selectedVariant || null,
    }));

    const newOrderData = {
      orderId,
      user: userId,
      items: normalizedItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Completed",
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      couponCode,
      shipping: Number(shipping) || 0,
      total: Number(total) || 0,
      orderStatus: "Placed",
      trackingHistory: [
        {
          status: "Placed",
          timestamp: new Date(),
          description: "Order placed successfully via " + paymentMethod.toUpperCase(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let savedOrder = null;

    if (isConnected()) {
      savedOrder = await Order.create(newOrderData);

      // If authenticated user, record recently purchased and clear cart
      if (userId) {
        const user = await User.findById(userId);
        if (user) {
          const productIds = items.map((i) => i.productId);
          user.addRecentlyPurchased(productIds);
          user.cart = []; // clear cart after order
          await user.save();
        }
      }
    } else {
      savedOrder = {
        _id: "order-" + Date.now(),
        ...newOrderData,
      };
      memoryStore.orders.unshift(savedOrder);

      // Update in-memory user
      if (userId) {
        const user = memoryStore.users.find((u) => u.id === userId || u._id === userId);
        if (user) {
          if (!user.recentlyPurchased) user.recentlyPurchased = [];
          items.forEach((item) => {
            user.recentlyPurchased = user.recentlyPurchased.filter(
              (p) => p.productId !== item.productId
            );
            user.recentlyPurchased.unshift({
              productId: item.productId,
              purchasedAt: new Date(),
            });
          });
          user.cart = []; // clear cart
        }
      }
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get user's orders
// @route  GET /api/orders
// @access Private
const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    let orders = [];

    if (isConnected()) {
      orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    } else {
      orders = memoryStore.orders
        .filter((o) => o.user === userId || String(o.user) === String(userId))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single order by orderId
// @route  GET /api/orders/:id
// @access Private
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order = null;

    if (isConnected()) {
      order = await Order.findOne({
        $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
    } else {
      order = memoryStore.orders.find((o) => o.orderId === id || o._id === id);
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order ${id} not found`,
      });
    }

    const userId = req.user.id || req.user._id;
    if (order.user && String(order.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to view this order.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Cancel order
// @route  PUT /api/orders/:id/cancel
// @access Private
const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;
    let order = null;

    if (isConnected()) {
      order = await Order.findOne({ orderId: id });
      if (!order) return res.status(404).json({ success: false, error: "Order not found" });

      if (order.user && String(order.user) !== String(userId)) {
        return res.status(403).json({
          success: false,
          error: "Not authorized to cancel this order.",
        });
      }

      if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
        return res.status(400).json({
          success: false,
          error: `Order cannot be cancelled because it is already ${order.orderStatus}.`,
        });
      }

      order.orderStatus = "Cancelled";
      order.trackingHistory.push({
        status: "Cancelled",
        timestamp: new Date(),
        description: "Order cancelled by customer.",
      });
      await order.save();
    } else {
      order = memoryStore.orders.find((o) => o.orderId === id || o._id === id);
      if (!order) return res.status(404).json({ success: false, error: "Order not found" });

      if (order.user && String(order.user) !== String(userId)) {
        return res.status(403).json({
          success: false,
          error: "Not authorized to cancel this order.",
        });
      }

      if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
        return res.status(400).json({
          success: false,
          error: `Order cannot be cancelled because it is already ${order.orderStatus}.`,
        });
      }

      order.orderStatus = "Cancelled";
      order.trackingHistory.push({
        status: "Cancelled",
        timestamp: new Date(),
        description: "Order cancelled by customer.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order has been cancelled successfully.",
      order,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};
