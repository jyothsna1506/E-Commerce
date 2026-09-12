const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/error");

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Core Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// API Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Shop Express API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Mount API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));

// Fallback for SPA/frontend routes: send index.html if not an API route
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      success: false,
      error: `API route ${req.method} ${req.originalUrl} not found`,
    });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`[Server] Shop Express running at http://localhost:${PORT}`);
    console.log(`[Server] API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`[Server] Frontend UI: http://localhost:${PORT}/`);
  });
}

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[Server] SIGTERM received. Shutting down gracefully...");
  if (server) server.close(() => process.exit(0));
});

module.exports = app;
