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

// @desc   Get user's wishlist
// @route  GET /api/wishlist
// @access Private
const getWishlist = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
    }

    const wishlistIds = user?.wishlist || [];
    const populated = [];

    for (const id of wishlistIds) {
      const prod = await findProduct(Number(id));
      if (prod) {
        populated.push(prod.toObject ? prod.toObject() : prod);
      }
    }

    res.status(200).json({
      success: true,
      count: populated.length,
      wishlist: populated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Toggle item in wishlist
// @route  POST /api/wishlist/:productId
// @access Private
const toggleWishlist = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      return res.status(400).json({ success: false, error: "Valid productId is required" });
    }

    let user = null;
    let inWishlist = false;

    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });

      const idx = user.wishlist.indexOf(productId);
      if (idx > -1) {
        user.wishlist.splice(idx, 1);
        inWishlist = false;
      } else {
        user.wishlist.push(productId);
        inWishlist = true;
      }
      await user.save();
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (!user) return res.status(404).json({ success: false, error: "User not found" });

      if (!user.wishlist) user.wishlist = [];
      const idx = user.wishlist.indexOf(productId);
      if (idx > -1) {
        user.wishlist.splice(idx, 1);
        inWishlist = false;
      } else {
        user.wishlist.push(productId);
        inWishlist = true;
      }
    }

    res.status(200).json({
      success: true,
      message: inWishlist ? "Added to wishlist" : "Removed from wishlist",
      inWishlist,
      wishlistCount: user.wishlist.length,
      wishlistIds: user.wishlist,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Remove item from wishlist
// @route  DELETE /api/wishlist/:productId
// @access Private
const removeFromWishlist = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    let user = null;

    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (user) {
        user.wishlist = user.wishlist.filter((id) => id !== productId);
        await user.save();
      }
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (user) {
        user.wishlist = (user.wishlist || []).filter((id) => id !== productId);
      }
    }

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      wishlistCount: user ? user.wishlist.length : 0,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
};
