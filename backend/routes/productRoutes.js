const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getCategories,
} = require("../controllers/productController");
const { validateProductId } = require("../middleware/validate");

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", validateProductId, getProductById);

module.exports = router;
