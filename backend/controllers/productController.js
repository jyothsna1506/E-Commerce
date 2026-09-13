const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const { isConnected } = require("../config/db");
const memoryStore = require("../services/storageService");

// Helper to provide realistic initial customer reviews for verified feel
const getInitialReviewsForProduct = (p) => {
  const ratingNum = Math.min(5, Math.max(4, Math.round(p.rating || 4.5)));
  return [
    {
      _id: `seed-rev-${p.id}-1`,
      userName: "Priya S.",
      rating: ratingNum,
      comment: "Superb product quality! Delivered quickly and nicely packaged. Exactly what I wanted.",
      verifiedPurchase: true,
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
    {
      _id: `seed-rev-${p.id}-2`,
      userName: "Rahul V.",
      rating: 5,
      comment: "Very durable and great value for money. Looks even better in person!",
      verifiedPurchase: true,
      createdAt: new Date(Date.now() - 86400000 * 14),
    },
  ];
};

// @desc   Get all products with filtering, search, sorting & pagination
// @route  GET /api/products
// @access Public
const getProducts = async (req, res, next) => {
  try {
    const { category, search, sort, minPrice, maxPrice, inStock, limit = 60, page = 1 } = req.query;

    let products = [];
    let total = 0;

    if (isConnected()) {
      const query = {};
      if (category && category !== "all") {
        query.category = category.toLowerCase();
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { tags: { $in: [new RegExp(search, "i")] } },
        ];
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (inStock === "true") {
        query.stock = { $gt: 0 };
      }

      let sortOption = {};
      if (sort === "price-low") sortOption = { price: 1 };
      else if (sort === "price-high") sortOption = { price: -1 };
      else if (sort === "rating") sortOption = { rating: -1 };
      else if (sort === "newest") sortOption = { createdAt: -1 };
      else sortOption = { id: 1 }; // Default featured/catalog order

      total = await Product.countDocuments(query);
      products = await Product.find(query)
        .sort(sortOption)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));
    } else {
      // Offline in-memory fallback
      let list = [...memoryStore.products];

      if (category && category !== "all") {
        list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            (p.brand && p.brand.toLowerCase().includes(q)) ||
            (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
      if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
      if (inStock === "true") list = list.filter((p) => p.stock > 0);

      if (sort === "price-low") list.sort((a, b) => a.price - b.price);
      else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
      else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
      else if (sort === "newest") list.sort((a, b) => b.id - a.id);
      else list.sort((a, b) => a.id - b.id);

      total = list.length;
      const start = (Number(page) - 1) * Number(limit);
      products = list.slice(start, start + Number(limit));
    }

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      limit: Number(limit),
      products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single product by numeric id
// @route  GET /api/products/:id
// @access Public
const getProductById = async (req, res, next) => {
  try {
    const numId = Number(req.params.id);
    let product = null;

    if (isConnected()) {
      product = await Product.findOne({ id: numId });
    } else {
      product = memoryStore.products.find((p) => p.id === numId);
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with ID ${numId} not found`,
      });
    }

    if (!product.reviewsList || product.reviewsList.length === 0) {
      product.reviewsList = getInitialReviewsForProduct(product);
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get categories list with product counts
// @route  GET /api/products/categories
// @access Public
const getCategories = async (req, res, next) => {
  try {
    const categories = ["fashion", "electronics", "home", "sports", "books", "beauty"];
    const stats = categories.map((cat) => {
      const prods = memoryStore.products.filter((p) => p.category === cat);
      return {
        category: cat,
        count: prods.length,
      };
    });

    res.status(200).json({
      success: true,
      categories: stats,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get product reviews and user review eligibility
// @route  GET /api/products/:id/reviews
// @access Public (Optional Auth)
const getProductReviews = async (req, res, next) => {
  try {
    const numId = Number(req.params.id);
    let product = null;

    if (isConnected()) {
      product = await Product.findOne({ id: numId });
    } else {
      product = memoryStore.products.find((p) => p.id === numId);
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with ID ${numId} not found`,
      });
    }

    if (!product.reviewsList || product.reviewsList.length === 0) {
      product.reviewsList = getInitialReviewsForProduct(product);
    }

    let hasPurchased = false;
    let hasReviewed = false;
    let userReview = null;

    if (req.user) {
      const userId = req.user.id || req.user._id;

      if (isConnected()) {
        const userDoc = await User.findById(userId);
        if (
          userDoc &&
          userDoc.recentlyPurchased &&
          userDoc.recentlyPurchased.some((p) => Number(p.productId) === numId)
        ) {
          hasPurchased = true;
        }
        if (!hasPurchased) {
          const orderExists = await Order.exists({
            user: userId,
            "items.productId": numId,
          });
          if (orderExists) hasPurchased = true;
        }
      } else {
        const userMem = memoryStore.users.find(
          (u) =>
            u.id === userId ||
            u._id === userId ||
            (u.email && u.email === req.user.email)
        );
        if (
          userMem &&
          userMem.recentlyPurchased &&
          userMem.recentlyPurchased.some((p) => Number(p.productId) === numId)
        ) {
          hasPurchased = true;
        }
        if (!hasPurchased) {
          const orderExists = memoryStore.orders.some((o) => {
            const isUser =
              o.user === userId ||
              (userMem && (o.user === userMem._id || o.user === userMem.id)) ||
              (o.shippingAddress && o.shippingAddress.email === req.user.email);
            return (
              isUser &&
              o.items &&
              o.items.some((i) => Number(i.productId) === numId)
            );
          });
          if (orderExists) hasPurchased = true;
        }
      }

      userReview =
        (product.reviewsList || []).find((r) => {
          const matchId =
            r.user &&
            (r.user.toString() === userId.toString());
          const matchEmail =
            r.userEmail &&
            req.user.email &&
            r.userEmail.toLowerCase() === req.user.email.toLowerCase();
          return matchId || matchEmail;
        }) || null;

      if (userReview) {
        hasReviewed = true;
      }
    }

    const canReview = Boolean(req.user && hasPurchased && !hasReviewed);

    res.status(200).json({
      success: true,
      productId: numId,
      rating: product.rating,
      reviewCount: product.reviewCount || product.reviews || 0,
      canReview,
      hasPurchased,
      hasReviewed,
      userReview,
      reviewsList: product.reviewsList || [],
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Create product review
// @route  POST /api/products/:id/reviews
// @access Private (Authenticated & Verified Purchaser)
const createProductReview = async (req, res, next) => {
  try {
    if (!req.user || (!req.user.id && !req.user._id)) {
      return res.status(401).json({
        success: false,
        error: "Please sign in to submit a review.",
      });
    }

    const numId = Number(req.params.id);
    const { rating, comment, reviewText } = req.body;
    const numRating = Number(rating);

    if (
      rating === undefined ||
      rating === null ||
      isNaN(numRating) ||
      numRating < 1 ||
      numRating > 5
    ) {
      return res.status(400).json({
        success: false,
        error: "Rating must be a valid number between 1 and 5.",
      });
    }

    const text = (comment || reviewText || "").trim();
    if (!text || text.length < 3) {
      return res.status(400).json({
        success: false,
        error: "Review text must be at least 3 characters long.",
      });
    }

    let product = null;
    if (isConnected()) {
      product = await Product.findOne({ id: numId });
    } else {
      product = memoryStore.products.find((p) => p.id === numId);
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with ID ${numId} not found`,
      });
    }

    if (!product.reviewsList || product.reviewsList.length === 0) {
      product.reviewsList = getInitialReviewsForProduct(product);
    }

    const userId = req.user.id || req.user._id;

    // Check duplicate review
    const alreadyReviewed = (product.reviewsList || []).some((r) => {
      const matchId = r.user && r.user.toString() === userId.toString();
      const matchEmail =
        r.userEmail &&
        req.user.email &&
        r.userEmail.toLowerCase() === req.user.email.toLowerCase();
      return matchId || matchEmail;
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        error: "You have already submitted a review for this product.",
      });
    }

    // Check verified purchase requirement
    let hasPurchased = false;
    if (isConnected()) {
      const userDoc = await User.findById(userId);
      if (
        userDoc &&
        userDoc.recentlyPurchased &&
        userDoc.recentlyPurchased.some((p) => Number(p.productId) === numId)
      ) {
        hasPurchased = true;
      }
      if (!hasPurchased) {
        const orderExists = await Order.exists({
          user: userId,
          "items.productId": numId,
        });
        if (orderExists) hasPurchased = true;
      }
    } else {
      const userMem = memoryStore.users.find(
        (u) =>
          u.id === userId ||
          u._id === userId ||
          (u.email && u.email === req.user.email)
      );
      if (
        userMem &&
        userMem.recentlyPurchased &&
        userMem.recentlyPurchased.some((p) => Number(p.productId) === numId)
      ) {
        hasPurchased = true;
      }
      if (!hasPurchased) {
        const orderExists = memoryStore.orders.some((o) => {
          const isUser =
            o.user === userId ||
            (userMem && (o.user === userMem._id || o.user === userMem.id)) ||
            (o.shippingAddress && o.shippingAddress.email === req.user.email);
          return (
            isUser &&
            o.items &&
            o.items.some((i) => Number(i.productId) === numId)
          );
        });
        if (orderExists) hasPurchased = true;
      }
    }

    if (!hasPurchased) {
      return res.status(403).json({
        success: false,
        error: "Only verified purchasers of this product can submit a review.",
      });
    }

    // Recalculate rating & review counts
    const currentCount = Number(product.reviewCount || product.reviews || 0);
    const currentRating = Number(product.rating || 4.5);
    const newCount = currentCount + 1;
    const newRating = Number(
      ((currentRating * currentCount + numRating) / newCount).toFixed(1)
    );

    const newReview = {
      _id: isConnected() ? new mongoose.Types.ObjectId() : "rev-" + Date.now(),
      user: userId,
      userName: req.user.name || "Verified Customer",
      userEmail: req.user.email || null,
      rating: numRating,
      comment: text,
      verifiedPurchase: true,
      createdAt: new Date(),
    };

    product.reviewsList.unshift(newReview);
    product.rating = newRating;
    product.reviewCount = newCount;
    product.reviews = newCount;

    if (isConnected()) {
      await product.save();
    }

    // Keep in-memory store in sync as well
    const memProd = memoryStore.products.find((p) => p.id === numId);
    if (memProd && memProd !== product) {
      if (!memProd.reviewsList) memProd.reviewsList = [];
      memProd.reviewsList.unshift(newReview);
      memProd.rating = newRating;
      memProd.reviewCount = newCount;
      memProd.reviews = newCount;
    }

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      review: newReview,
      rating: product.rating,
      reviewCount: product.reviewCount,
      reviews: product.reviews,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  getProductReviews,
  createProductReview,
};
