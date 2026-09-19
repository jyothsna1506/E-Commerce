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

    const carrier = "Express Logistics";
    const trackingNumber = `EXP-TRK-${orderId.replace(/^ORD-/, "")}`;
    const estimatedDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const normalizedShippingAddress = {
      fullName: shippingAddress ? (shippingAddress.fullName || "") : "",
      email: shippingAddress ? (shippingAddress.email || (req.user ? req.user.email : "") || "") : (req.user ? req.user.email : ""),
      phone: shippingAddress ? (shippingAddress.phone || "") : "",
      street: shippingAddress ? (shippingAddress.street || shippingAddress.addressLine1 || "") : "",
      addressLine1: shippingAddress ? (shippingAddress.addressLine1 || shippingAddress.street || "") : "",
      addressLine2: shippingAddress ? (shippingAddress.addressLine2 || "") : "",
      city: shippingAddress ? (shippingAddress.city || "") : "",
      state: shippingAddress ? (shippingAddress.state || "") : "",
      pincode: shippingAddress ? (shippingAddress.pincode || shippingAddress.postalCode || "") : "",
      postalCode: shippingAddress ? (shippingAddress.postalCode || shippingAddress.pincode || "") : "",
      country: shippingAddress ? (shippingAddress.country || "India") : "India",
    };

    const newOrderData = {
      orderId,
      user: userId,
      items: normalizedItems,
      shippingAddress: normalizedShippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Completed",
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      couponCode,
      shipping: Number(shipping) || 0,
      total: Number(total) || 0,
      orderStatus: "Placed",
      carrier,
      trackingNumber,
      estimatedDeliveryDate,
      trackingHistory: [
        {
          status: "Placed",
          timestamp: new Date(),
          description: "Order placed successfully via " + paymentMethod.toUpperCase(),
          location: "Fulfillment Center",
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

      if (
        order.orderStatus === "Shipped" ||
        order.orderStatus === "Out for Delivery" ||
        order.orderStatus === "Delivered"
      ) {
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
        location: "Customer Request",
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

      if (
        order.orderStatus === "Shipped" ||
        order.orderStatus === "Out for Delivery" ||
        order.orderStatus === "Delivered"
      ) {
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
        location: "Customer Request",
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

// Helper to look up order across DB or memory
const findOrderRecord = async (id) => {
  if (isConnected()) {
    return await Order.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });
  }
  return memoryStore.orders.find((o) => o.orderId === id || o._id === id);
};

// @desc   Get dynamic order tracking status and history
// @route  GET /api/orders/:id/tracking
// @access Private
const getOrderTracking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;
    const order = await findOrderRecord(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order ${id} not found`,
      });
    }

    if (order.user && String(order.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to view tracking for this order.",
      });
    }

    const stages = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
    const rankMap = {
      Placed: 1,
      Confirmed: 1.5,
      Shipped: 2,
      "Out for Delivery": 3,
      Delivered: 4,
      Cancelled: -1,
    };
    const currentRank = rankMap[order.orderStatus] || 1;
    const isCancelled = order.orderStatus === "Cancelled";

    const milestones = stages.map((st) => {
      const historyEntry = (order.trackingHistory || []).find((h) => h.status === st);
      const isCurrent = !isCancelled && order.orderStatus === st;
      const isCompleted = !isCancelled && currentRank >= rankMap[st];
      return {
        stage: st,
        status: isCancelled
          ? "Cancelled"
          : isCurrent
          ? "current"
          : isCompleted
          ? "completed"
          : "upcoming",
        isCompleted,
        isCurrent,
        timestamp: historyEntry ? historyEntry.timestamp : null,
        description: historyEntry ? historyEntry.description : null,
        location: historyEntry ? historyEntry.location : null,
      };
    });

    const deliveredEntry = (order.trackingHistory || []).find((h) => h.status === "Delivered");
    const deliveredAt =
      order.orderStatus === "Delivered"
        ? deliveredEntry
          ? deliveredEntry.timestamp
          : order.updatedAt
        : null;

    const estimatedDeliveryDate =
      order.estimatedDeliveryDate ||
      new Date(new Date(order.createdAt || Date.now()).getTime() + 3 * 24 * 60 * 60 * 1000);

    const currentLocation =
      order.trackingHistory && order.trackingHistory.length > 0
        ? order.trackingHistory[order.trackingHistory.length - 1].location || "Fulfillment Center"
        : "Fulfillment Center";

    res.status(200).json({
      success: true,
      tracking: {
        orderId: order.orderId,
        orderStatus: order.orderStatus,
        carrier: order.carrier || "Express Logistics",
        trackingNumber: order.trackingNumber || `EXP-TRK-${order.orderId.replace(/^ORD-/, "")}`,
        estimatedDeliveryDate,
        deliveredAt,
        currentLocation,
        trackingHistory: order.trackingHistory || [],
        milestones,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Progress order status along delivery lifecycle
// @route  PUT /api/orders/:id/progress
// @access Private
const progressOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;
    const order = await findOrderRecord(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order ${id} not found`,
      });
    }

    if (order.user && String(order.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this order.",
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        error: "Cannot progress a cancelled order.",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        error: "Order is already delivered.",
      });
    }

    const lifecycleSequence = {
      Placed: "Shipped",
      Confirmed: "Shipped",
      Shipped: "Out for Delivery",
      "Out for Delivery": "Delivered",
    };

    const rankMap = {
      Placed: 1,
      Confirmed: 1.5,
      Shipped: 2,
      "Out for Delivery": 3,
      Delivered: 4,
    };

    let targetStatus = req.body && req.body.status;
    if (targetStatus) {
      const allowedStatuses = ["Confirmed", "Shipped", "Out for Delivery", "Delivered"];
      if (!allowedStatuses.includes(targetStatus)) {
        return res.status(400).json({
          success: false,
          error: `Invalid status '${targetStatus}'. Allowed statuses: ${allowedStatuses.join(", ")}`,
        });
      }

      const currentRank = rankMap[order.orderStatus] || 1;
      const targetRank = rankMap[targetStatus];
      if (targetRank <= currentRank) {
        return res.status(400).json({
          success: false,
          error: `Cannot transition order status backward or to same status from '${order.orderStatus}' to '${targetStatus}'.`,
        });
      }
    } else {
      targetStatus = lifecycleSequence[order.orderStatus];
    }

    if (!targetStatus) {
      return res.status(400).json({
        success: false,
        error: `No valid forward transition for status '${order.orderStatus}'.`,
      });
    }

    const descriptions = {
      Confirmed: {
        description: "Order confirmed and verified by merchant.",
        location: "Fulfillment Center",
      },
      Shipped: {
        description: "Package dispatched and in transit with courier partner.",
        location: "Regional Sorting Hub",
      },
      "Out for Delivery": {
        description: "Package out for delivery with local courier agent.",
        location: "Local Delivery Hub",
      },
      Delivered: {
        description: "Package successfully delivered to customer doorstep.",
        location: "Customer Destination",
      },
    };

    const info = descriptions[targetStatus] || {
      description: `Order status advanced to ${targetStatus}.`,
      location: "In Transit",
    };

    const newHistoryEntry = {
      status: targetStatus,
      timestamp: new Date(),
      description: info.description,
      location: info.location,
    };

    if (!order.trackingHistory) order.trackingHistory = [];
    order.trackingHistory.push(newHistoryEntry);
    order.orderStatus = targetStatus;

    if (targetStatus === "Delivered" && order.paymentMethod === "cod") {
      order.paymentStatus = "Completed";
    }

    order.updatedAt = new Date();

    if (isConnected()) {
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: `Order status progressed to ${targetStatus} successfully.`,
      order,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get printable invoice / receipt data
// @route  GET /api/orders/:id/invoice
// @access Private
const getOrderInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;
    const order = await findOrderRecord(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order ${id} not found`,
      });
    }

    if (order.user && String(order.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to view invoice for this order.",
      });
    }

    const subtotal = Number(order.subtotal) || 0;
    const discount = Number(order.discount) || 0;
    const shipping = Number(order.shipping) || 0;
    const total = Number(order.total) || 0;

    const invoice = {
      invoiceNumber: `INV-${order.orderId}`,
      orderId: order.orderId,
      orderDate: order.createdAt || new Date(),
      orderStatus: order.orderStatus,
      storeName: "Shop Express",
      seller: {
        name: "Shop Express Retail Private Limited",
        gstin: "29AABCU9603R1ZM",
        address: "Plot 14, Outer Ring Road, Bengaluru, Karnataka - 560103",
        email: "support@shopexpress.in",
        phone: "+91 80 4000 1234",
      },
      customer: {
        name: order.shippingAddress?.fullName || req.user?.name || "Customer",
        email: order.shippingAddress?.email || req.user?.email || "customer@example.com",
        phone: order.shippingAddress?.phone || "N/A",
      },
      shippingAddress: order.shippingAddress,
      items: (order.items || []).map((item) => ({
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        selectedVariant: item.selectedVariant || item.size || null,
        itemSubtotal: Number((item.price * item.quantity).toFixed(2)),
      })),
      pricing: {
        subtotal,
        discount,
        couponCode: order.couponCode || null,
        shipping,
        taxRate: "18% GST (Included)",
        taxAmount: Number(((subtotal * 0.18) / 1.18).toFixed(2)),
        total,
      },
      payment: {
        method: (order.paymentMethod || "card").toUpperCase(),
        status: order.paymentStatus || "Completed",
      },
      tracking: {
        carrier: order.carrier || "Express Logistics",
        trackingNumber: order.trackingNumber || `EXP-TRK-${order.orderId.replace(/^ORD-/, "")}`,
        estimatedDeliveryDate:
          order.estimatedDeliveryDate ||
          new Date(new Date(order.createdAt || Date.now()).getTime() + 3 * 24 * 60 * 60 * 1000),
      },
    };

    res.status(200).json({
      success: true,
      invoice,
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
  getOrderTracking,
  progressOrderStatus,
  getOrderInvoice,
};
