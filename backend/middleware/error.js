// Centralized Express Error Handling Middleware

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for developers in development
  if (process.env.NODE_ENV !== "test") {
    console.error("[Error Handler]", err.stack || err.message);
  }

  // Mongoose Bad ObjectId / CastError
  if (err.name === "CastError") {
    const message = `Resource not found with id: ${err.value}`;
    return res.status(404).json({ success: false, error: message });
  }

  // Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const message = `An account with that ${field} already exists.`;
    return res.status(409).json({ success: false, error: message });
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    return res.status(400).json({ success: false, error: message });
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, error: "Invalid authorization token." });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, error: "Authorization token expired." });
  }

  // Default server error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
