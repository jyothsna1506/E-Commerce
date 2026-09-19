const Product = require("../models/Product");
const User = require("../models/User");
const { isConnected } = require("../config/db");
const memoryStore = require("../services/storageService");
const { getPersonalizedRecommendations } = require("../services/recommendationService");

// @desc   Get personalized recommendations for authenticated user (or catalog fallback)
// @route  GET /api/recommendations
// @access Public (with optional auth)
const getRecommendations = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 8;
    let products = [];
    let user = req.user || null;

    if (isConnected()) {
      products = await Product.find({});
      if (req.user && req.user.id) {
        user = await User.findById(req.user.id);
      }
    } else {
      products = [...memoryStore.products];
      if (req.user && req.user.id) {
        user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      }
    }

    const recommendations = getPersonalizedRecommendations({
      user,
      products,
      limit,
    });

    res.status(200).json({
      success: true,
      count: recommendations.length,
      isPersonalized: !!user,
      recommendations,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecommendations,
};
