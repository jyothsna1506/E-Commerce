const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getOrderTracking,
  progressOrderStatus,
  getOrderInvoice,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");
const { validateOrder } = require("../middleware/validate");

router.post("/", protect, validateOrder, createOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.get("/:id/tracking", protect, getOrderTracking);
router.put("/:id/progress", protect, progressOrderStatus);
router.get("/:id/invoice", protect, getOrderInvoice);
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;
