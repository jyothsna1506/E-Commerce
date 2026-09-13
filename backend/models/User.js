const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    selectedVariant: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Do not return password by default in queries
    },
    preferences: {
      ageRange: {
        type: String,
        enum: ["under-18", "18-24", "25-34", "35-44", "45-54", "55+", ""],
        default: "25-34",
      },
      gender: {
        type: String,
        enum: ["male", "female", "other", "prefer-not-to-say", ""],
        default: "",
      },
      preferredCategories: {
        type: [String],
        default: ["fashion", "electronics"],
      },
      clothingSize: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL", ""],
        default: "M",
      },
      shoeSize: {
        type: String,
        enum: ["6", "7", "8", "9", "10", "11", ""],
        default: "9",
      },
      preferredStyles: {
        type: [String],
        default: ["Casual"],
      },
      shoppingInterests: {
        type: [String],
        default: ["Trending Deals", "New Arrivals"],
      },
      budgetRange: {
        type: String,
        enum: ["budget", "mid-range", "premium", "all", ""],
        default: "all",
      },
    },
    recentlyViewed: [
      {
        productId: {
          type: Number,
          required: true,
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    recentlyPurchased: [
      {
        productId: {
          type: Number,
          required: true,
        },
        purchasedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cart: [cartItemSchema],
    wishlist: [
      {
        type: Number,
      },
    ],
    addresses: [
      {
        fullName: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Limit recentlyViewed to 15 items maximum
userSchema.methods.addRecentlyViewed = function (productId) {
  const numId = Number(productId);
  if (!numId) return;
  // Remove duplicate if exists
  this.recentlyViewed = this.recentlyViewed.filter((item) => item.productId !== numId);
  // Add to beginning
  this.recentlyViewed.unshift({ productId: numId, viewedAt: new Date() });
  // Keep max 15
  if (this.recentlyViewed.length > 15) {
    this.recentlyViewed = this.recentlyViewed.slice(0, 15);
  }
};

// Add recently purchased items
userSchema.methods.addRecentlyPurchased = function (productIds) {
  const ids = Array.isArray(productIds) ? productIds : [productIds];
  ids.forEach((id) => {
    const numId = Number(id);
    if (!numId) return;
    this.recentlyPurchased = this.recentlyPurchased.filter((item) => item.productId !== numId);
    this.recentlyPurchased.unshift({ productId: numId, purchasedAt: new Date() });
  });
  if (this.recentlyPurchased.length > 20) {
    this.recentlyPurchased = this.recentlyPurchased.slice(0, 20);
  }
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
