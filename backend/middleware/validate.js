// Input validation helper routines

const validateRegister = (req, res, next) => {
  const { name, email, password, confirmPassword, phone } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid name (at least 2 characters).",
    });
  }

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address.",
    });
  }

  if (phone && typeof phone === "string" && phone.trim()) {
    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid 10-digit mobile number.",
      });
    }
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      error: "Password must be at least 6 characters long.",
    });
  }

  if (confirmPassword !== undefined && confirmPassword !== password) {
    return res.status(400).json({
      success: false,
      error: "Passwords do not match. Please verify your confirm password.",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const identifier = req.body.identifier || req.body.email || req.body.phone;
  const password = req.body.password;

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide your email address or phone number and password.",
    });
  }

  next();
};

const validateOrder = (req, res, next) => {
  const { items, shippingAddress, total } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Order must contain at least one item.",
    });
  }

  for (const item of items) {
    if (!item.productId || !item.name || typeof item.price !== "number" || !item.quantity) {
      return res.status(400).json({
        success: false,
        error: "Each order item must have productId, name, valid price, and quantity.",
      });
    }
  }

  if (!shippingAddress || typeof shippingAddress !== "object") {
    return res.status(400).json({
      success: false,
      error: "Shipping address is required.",
    });
  }

  const { fullName, phone, street, city, state, pincode } = shippingAddress;
  if (!fullName || !phone || !street || !city || !state || !pincode) {
    return res.status(400).json({
      success: false,
      error: "All address fields (fullName, phone, street, city, state, pincode) are required.",
    });
  }

  if (typeof total !== "number" || total < 0) {
    return res.status(400).json({
      success: false,
      error: "Valid order total is required.",
    });
  }

  next();
};

const validateProductId = (req, res, next) => {
  const id = Number(req.params.id || req.body.productId);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid product ID specified.",
    });
  }
  next();
};

const validateReview = (req, res, next) => {
  const { rating, comment, reviewText } = req.body;
  const numRating = Number(rating);

  if (rating === undefined || rating === null || isNaN(numRating) || numRating < 1 || numRating > 5) {
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

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateOrder,
  validateProductId,
  validateReview,
};
