const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    brand: {
      type: String,
      default: "Shop Express",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["fashion", "electronics", "home", "sports", "books", "beauty"],
      lowercase: true,
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
      default: "General",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      },
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock count is required"],
      default: 20,
      min: 0,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
      trim: true,
    },
    variants: {
      type: [String],
      default: null,
    },
    colors: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Search text index on name, description, tags, brand
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  subcategory: "text",
  tags: "text",
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
