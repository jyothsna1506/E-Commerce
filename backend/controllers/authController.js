const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { isConnected } = require("../config/db");
const { signToken } = require("../middleware/auth");
const memoryStore = require("../services/storageService");

// Helper to sanitize user object for response
const formatUserResponse = (user) => {
  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || null,
    preferences: user.preferences || {
      ageRange: "25-34",
      preferredCategories: ["fashion", "electronics"],
      clothingSize: "M",
      shoeSize: "9",
      preferredStyles: ["Casual"],
      shoppingInterests: ["Trending Deals", "New Arrivals"],
      budgetRange: "all",
    },
    cart: user.cart || [],
    wishlist: user.wishlist || [],
    recentlyViewed: user.recentlyViewed || [],
    recentlyPurchased: user.recentlyPurchased || [],
    addresses: user.addresses || [],
  };
};

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, phone, preferences } = req.body;
    const cleanEmail = (email || "").toLowerCase().trim();
    const cleanPhone = phone ? phone.trim().replace(/\D/g, "").slice(-10) : null;

    if (confirmPassword !== undefined && confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        error: "Passwords do not match. Please verify your confirm password.",
      });
    }

    const initialPreferences = {
      ageRange: "25-34",
      preferredCategories: ["fashion", "electronics"],
      clothingSize: "M",
      shoeSize: "9",
      preferredStyles: ["Casual"],
      shoppingInterests: ["Trending Deals", "New Arrivals"],
      budgetRange: "all",
      ...(preferences || {}),
    };

    if (isConnected()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          error: "An account with this email address already exists. Please sign in.",
        });
      }

      if (cleanPhone) {
        const existingPhone = await User.findOne({ phone: cleanPhone });
        if (existingPhone) {
          return res.status(409).json({
            success: false,
            error: "An account with this phone number already exists. Please sign in.",
          });
        }
      }

      const user = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password,
        phone: cleanPhone,
        preferences: initialPreferences,
      });

      const token = signToken(user);
      return res.status(201).json({
        success: true,
        message: "Account created successfully.",
        token,
        user: formatUserResponse(user),
      });
    } else {
      // In-memory fallback
      const existing = memoryStore.users.find((u) => u.email === cleanEmail);
      if (existing) {
        return res.status(409).json({
          success: false,
          error: "An account with this email address already exists. Please sign in.",
        });
      }

      if (cleanPhone) {
        const existingPhone = memoryStore.users.find((u) => u.phone === cleanPhone);
        if (existingPhone) {
          return res.status(409).json({
            success: false,
            error: "An account with this phone number already exists. Please sign in.",
          });
        }
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        _id: "user-" + Date.now(),
        id: "user-" + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        phone: cleanPhone,
        preferences: initialPreferences,
        cart: [],
        wishlist: [],
        recentlyViewed: [],
        recentlyPurchased: [],
        addresses: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      memoryStore.users.push(newUser);
      const token = signToken(newUser);

      return res.status(201).json({
        success: true,
        message: "Account created successfully.",
        token,
        user: formatUserResponse(newUser),
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
const login = async (req, res, next) => {
  try {
    const rawIdentifier = (req.body.identifier || req.body.email || req.body.phone || "").trim();
    const cleanIdentifier = rawIdentifier.toLowerCase();
    const cleanPhoneDigits = rawIdentifier.replace(/\D/g, "").slice(-10);
    const { password } = req.body;

    let user = null;

    if (isConnected()) {
      // Search by email or phone
      user = await User.findOne({
        $or: [
          { email: cleanIdentifier },
          { phone: cleanPhoneDigits || cleanIdentifier },
        ],
      }).select("+password");

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid email/phone or password. Please try again.",
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid email/phone or password. Please try again.",
        });
      }
    } else {
      // In-memory fallback
      user = memoryStore.users.find(
        (u) =>
          u.email === cleanIdentifier ||
          u.phone === cleanIdentifier ||
          (cleanPhoneDigits && u.phone === cleanPhoneDigits)
      );
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid email/phone or password. Please try again.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid email/phone or password. Please try again.",
        });
      }
    }

    const token = signToken(user);

    res.status(200).json({
      success: true,
      message: "Signed in successfully.",
      token,
      user: formatUserResponse(user),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get currently authenticated user
// @route  GET /api/auth/me
// @access Private
const getMe = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: formatUserResponse(user),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Phone number login foundation
// @route  POST /api/auth/phone-login
// @access Public
const phoneLogin = async (req, res, next) => {
  try {
    const { phone, otp, name } = req.body;
    if (!phone || phone.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid 10-digit mobile number.",
      });
    }

    const cleanPhone = phone.trim().replace(/\D/g, "").slice(-10);

    // Default demonstration OTP "123456"
    if (!otp) {
      return res.status(200).json({
        success: true,
        message: `OTP sent successfully to +91 ${cleanPhone}. (Use demo OTP: 123456)`,
        otpSent: true,
        demoOtp: "123456",
        phone: cleanPhone,
      });
    }

    if (otp !== "123456") {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP entered. Please use 123456 for demo verification.",
      });
    }

    // OTP verified, find or create phone user
    let user = null;

    if (isConnected()) {
      user = await User.findOne({ phone: cleanPhone });
      if (!user) {
        user = await User.create({
          name: name ? name.trim() : "Shopper " + cleanPhone.slice(-4),
          email: "phone_" + cleanPhone + "@shopexpress.local",
          phone: cleanPhone,
          password: "phone_auth_user_" + Date.now(),
          preferences: {
            ageRange: "25-34",
            preferredCategories: ["fashion", "electronics"],
            clothingSize: "M",
            shoeSize: "9",
            preferredStyles: ["Casual"],
            shoppingInterests: ["Trending Deals"],
            budgetRange: "all",
          },
        });
      }
    } else {
      user = memoryStore.users.find((u) => u.phone === cleanPhone);
      if (!user) {
        user = {
          _id: "phone-user-" + Date.now(),
          id: "phone-user-" + Date.now(),
          name: name ? name.trim() : "Shopper " + cleanPhone.slice(-4),
          email: "phone_" + cleanPhone + "@shopexpress.local",
          phone: cleanPhone,
          preferences: {
            ageRange: "25-34",
            preferredCategories: ["fashion", "electronics"],
            clothingSize: "M",
            shoeSize: "9",
            preferredStyles: ["Casual"],
            shoppingInterests: ["Trending Deals"],
            budgetRange: "all",
          },
          cart: [],
          wishlist: [],
          recentlyViewed: [],
          recentlyPurchased: [],
          addresses: [],
        };
        memoryStore.users.push(user);
      }
    }

    const token = signToken(user);
    res.status(200).json({
      success: true,
      message: "Phone verification successful.",
      token,
      user: formatUserResponse(user),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Google authentication
// @route  POST /api/auth/google
// @access Public
const googleAuth = async (req, res, next) => {
  try {
    let email, name, picture;

    // Handle Google Identity Services credential (ID Token)
    if (req.body.credential) {
      try {
        const parts = req.body.credential.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
          email = payload.email;
          name = payload.name;
          picture = payload.picture;
        }
      } catch (_) {}
    }

    if (!email && req.body.profile) {
      email = req.body.profile.email;
      name = req.body.profile.name;
      picture = req.body.profile.picture;
    }

    if (!email && req.body.email) {
      email = req.body.email;
      name = req.body.name || "Google User";
      picture = req.body.picture;
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Google profile data with a valid email address is required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = null;

    if (isConnected()) {
      user = await User.findOne({ email: cleanEmail });
      if (!user) {
        user = await User.create({
          name: name || "Google User",
          email: cleanEmail,
          password: "google_oauth_" + Math.random().toString(36).slice(2) + Date.now(),
          preferences: {
            ageRange: "25-34",
            preferredCategories: ["fashion", "electronics"],
            clothingSize: "M",
            shoeSize: "9",
            preferredStyles: ["Casual"],
            shoppingInterests: ["Trending Deals", "New Arrivals"],
            budgetRange: "all",
          },
        });
      }
    } else {
      user = memoryStore.users.find((u) => u.email === cleanEmail);
      if (!user) {
        user = {
          _id: "google-user-" + Date.now(),
          id: "google-user-" + Date.now(),
          name: name || "Google User",
          email: cleanEmail,
          preferences: {
            ageRange: "25-34",
            preferredCategories: ["fashion", "electronics"],
            clothingSize: "M",
            shoeSize: "9",
            preferredStyles: ["Casual"],
            shoppingInterests: ["Trending Deals", "New Arrivals"],
            budgetRange: "all",
          },
          cart: [],
          wishlist: [],
          recentlyViewed: [],
          recentlyPurchased: [],
          addresses: [],
        };
        memoryStore.users.push(user);
      }
    }

    const jwtToken = signToken(user);
    res.status(200).json({
      success: true,
      message: "Google sign-in successful.",
      token: jwtToken,
      user: formatUserResponse(user),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Logout user
// @route  POST /api/auth/logout
// @access Public
const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

module.exports = {
  register,
  login,
  getMe,
  phoneLogin,
  googleAuth,
  logout,
  formatUserResponse,
};
