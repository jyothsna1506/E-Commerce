const Product = require("../models/Product");
const { isConnected } = require("../config/db");
const memoryStore = require("../services/storageService");

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

module.exports = {
  getProducts,
  getProductById,
  getCategories,
};
