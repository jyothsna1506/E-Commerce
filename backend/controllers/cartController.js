const User = require("../models/User");
const Product = require("../models/Product");
const { isConnected } = require("../config/db");
const memoryStore = require("../services/storageService");

const findProduct = async (numId) => {
  if (isConnected()) {
    return Product.findOne({ id: numId });
  }
  return memoryStore.products.find((p) => p.id === numId);
};

const populateCart = async (cartItems = []) => {
  const items = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const prod = await findProduct(item.productId);
    if (prod) {
      const price = prod.price;
      const itemSubtotal = price * item.quantity;
      subtotal += itemSubtotal;
      items.push({
        _id: item._id || item.id || "cart-" + item.productId + "-" + (item.selectedVariant || "default"),
        productId: prod.id,
        name: prod.name,
        price: prod.price,
        originalPrice: prod.originalPrice,
        discount: prod.discount,
        image: prod.image,
        category: prod.category,
        stock: prod.stock,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant || null,
        itemSubtotal,
      });
    }
  }

  return { items, subtotal };
};

// @desc   Get user's cart
// @route  GET /api/cart
// @access Private
const getCart = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
    }

    const { items, subtotal } = await populateCart(user?.cart || []);

    res.status(200).json({
      success: true,
      count: items.length,
      subtotal,
      shipping: subtotal > 0 ? 0 : 0, // Free shipping
      total: subtotal,
      cart: items,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Add item to cart
// @route  POST /api/cart
// @access Private
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, selectedVariant = null } = req.body;
    const numId = Number(productId);
    const qty = Math.max(1, Number(quantity) || 1);

    if (!numId) {
      return res.status(400).json({ success: false, error: "Valid productId is required" });
    }

    const prod = await findProduct(numId);
    if (!prod) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    if (prod.stock < qty) {
      return res.status(400).json({
        success: false,
        error: `Only ${prod.stock} items available in stock.`,
      });
    }

    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });

      const existingIndex = user.cart.findIndex(
        (i) => i.productId === numId && (i.selectedVariant || null) === (selectedVariant || null)
      );

      if (existingIndex > -1) {
        user.cart[existingIndex].quantity += qty;
      } else {
        user.cart.push({ productId: numId, quantity: qty, selectedVariant });
      }

      await user.save();
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });

      if (!user.cart) user.cart = [];
      const existingIndex = user.cart.findIndex(
        (i) => i.productId === numId && (i.selectedVariant || null) === (selectedVariant || null)
      );

      if (existingIndex > -1) {
        user.cart[existingIndex].quantity += qty;
      } else {
        user.cart.push({
          _id: "cart-item-" + Date.now(),
          productId: numId,
          quantity: qty,
          selectedVariant,
        });
      }
    }

    const { items, subtotal } = await populateCart(user.cart);

    res.status(200).json({
      success: true,
      message: "Product added to cart.",
      count: items.length,
      subtotal,
      total: subtotal,
      cart: items,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Update cart item quantity
// @route  PUT /api/cart/:itemId
// @access Private
const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const qty = Number(quantity);

    if (isNaN(qty) || qty < 0) {
      return res.status(400).json({ success: false, error: "Valid quantity is required" });
    }

    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });

      if (qty === 0) {
        user.cart = user.cart.filter((i) => i._id.toString() !== itemId);
      } else {
        const item = user.cart.find((i) => i._id.toString() === itemId);
        if (item) item.quantity = qty;
      }
      await user.save();
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });

      if (qty === 0) {
        user.cart = (user.cart || []).filter((i) => i._id !== itemId);
      } else {
        const item = (user.cart || []).find((i) => i._id === itemId);
        if (item) item.quantity = qty;
      }
    }

    const { items, subtotal } = await populateCart(user.cart);

    res.status(200).json({
      success: true,
      message: "Cart updated.",
      count: items.length,
      subtotal,
      total: subtotal,
      cart: items,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Remove item from cart
// @route  DELETE /api/cart/:itemId
// @access Private
const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });
      user.cart = user.cart.filter((i) => i._id.toString() !== itemId && String(i.productId) !== itemId);
      await user.save();
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });
      user.cart = (user.cart || []).filter((i) => i._id !== itemId && String(i.productId) !== itemId);
    }

    const { items, subtotal } = await populateCart(user.cart);

    res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      count: items.length,
      subtotal,
      total: subtotal,
      cart: items,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Clear entire cart
// @route  DELETE /api/cart
// @access Private
const clearCart = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (user) {
        user.cart = [];
        await user.save();
      }
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (user) user.cart = [];
    }

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
      count: 0,
      subtotal: 0,
      total: 0,
      cart: [],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
