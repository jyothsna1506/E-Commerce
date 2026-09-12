const User = require("../models/User");
const Product = require("../models/Product");
const { isConnected } = require("../config/db");
const memoryStore = require("../services/storageService");
const { formatUserResponse } = require("./authController");

// Helper to get product by numeric ID from whichever store is active
const findProduct = async (numId) => {
  if (isConnected()) {
    return Product.findOne({ id: numId });
  }
  return memoryStore.products.find((p) => p.id === numId);
};

// @desc   Update user profile & personalization preferences
// @route  PUT /api/users/profile
// @access Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, preferences, addresses } = req.body;
    let user = null;

    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      if (name) user.name = name.trim();
      if (phone !== undefined) user.phone = phone ? phone.trim() : null;
      if (preferences) {
        user.preferences = {
          ...user.preferences.toObject(),
          ...preferences,
        };
      }
      if (addresses && Array.isArray(addresses)) {
        user.addresses = addresses;
      }

      await user.save();
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      if (name) user.name = name.trim();
      if (phone !== undefined) user.phone = phone ? phone.trim() : null;
      if (preferences) {
        user.preferences = {
          ...user.preferences,
          ...preferences,
        };
      }
      if (addresses && Array.isArray(addresses)) {
        user.addresses = addresses;
      }
      user.updatedAt = new Date();
    }

    res.status(200).json({
      success: true,
      message: "Profile and preferences updated successfully.",
      user: formatUserResponse(user),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Record a product view
// @route  POST /api/users/recently-viewed
// @access Private
const recordRecentlyViewed = async (req, res, next) => {
  try {
    const productId = Number(req.body.productId);
    if (!productId) {
      return res.status(400).json({ success: false, error: "Valid productId is required" });
    }

    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (user) {
        user.addRecentlyViewed(productId);
        await user.save();
      }
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (user) {
        user.recentlyViewed = (user.recentlyViewed || []).filter((item) => item.productId !== productId);
        user.recentlyViewed.unshift({ productId, viewedAt: new Date() });
        if (user.recentlyViewed.length > 15) {
          user.recentlyViewed = user.recentlyViewed.slice(0, 15);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Product view recorded.",
      recentlyViewed: user ? user.recentlyViewed : [],
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get recently viewed products with full product details
// @route  GET /api/users/recently-viewed
// @access Private
const getRecentlyViewed = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
    }

    const rvList = user?.recentlyViewed || [];
    const populated = [];

    for (const item of rvList) {
      const prod = await findProduct(item.productId);
      if (prod) {
        populated.push({
          ...(prod.toObject ? prod.toObject() : prod),
          viewedAt: item.viewedAt,
        });
      }
    }

    res.status(200).json({
      success: true,
      count: populated.length,
      recentlyViewed: populated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get recently purchased products
// @route  GET /api/users/recently-purchased
// @access Private
const getRecentlyPurchased = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
    }

    const rpList = user?.recentlyPurchased || [];
    const populated = [];

    for (const item of rpList) {
      const prod = await findProduct(item.productId);
      if (prod) {
        populated.push({
          ...(prod.toObject ? prod.toObject() : prod),
          purchasedAt: item.purchasedAt,
        });
      }
    }

    res.status(200).json({
      success: true,
      count: populated.length,
      recentlyPurchased: populated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateProfile,
  recordRecentlyViewed,
  getRecentlyViewed,
  getRecentlyPurchased,
};
