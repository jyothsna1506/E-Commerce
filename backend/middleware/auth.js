const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "shop_express_super_secret_jwt_key_2026_production";

// Middleware to protect routes (Authentication required)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route. Please sign in.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user in MongoDB or fallback storage
    let user = null;
    try {
      user = await User.findById(decoded.id).select("-password");
    } catch (_) {}

    if (!user) {
      // Create lightweight authenticated principal from token payload
      user = {
        _id: decoded.id,
        id: decoded.id,
        email: decoded.email,
        name: decoded.name || "Customer",
        preferences: decoded.preferences || {},
      };
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Session expired or invalid token. Please sign in again.",
    });
  }
};

// Optional auth: attaches user if token exists, or proceeds with unauthenticated principal
const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user = null;
    try {
      user = await User.findById(decoded.id).select("-password");
    } catch (_) {}

    req.user = user || {
      _id: decoded.id,
      id: decoded.id,
      email: decoded.email,
      name: decoded.name || "Customer",
      preferences: decoded.preferences || {},
    };
  } catch (_) {
    req.user = null;
  }

  next();
};

// Helper to sign JWT token
const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      name: user.name,
      preferences: user.preferences,
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

module.exports = { protect, optionalAuth, signToken };
