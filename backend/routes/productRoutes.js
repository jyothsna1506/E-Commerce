const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getCategories,
  getProductReviews,
  createProductReview,
} = require("../controllers/productController");
const { protect, optionalAuth } = require("../middleware/auth");
const { validateProductId, validateReview } = require("../middleware/validate");

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id/reviews", validateProductId, optionalAuth, getProductReviews);
router.post("/:id/reviews", validateProductId, protect, validateReview, createProductReview);
router.get("/:id", validateProductId, getProductById);

module.exports = router;
