const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
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
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, default: "" },
      phone: { type: String, required: true },
      street: { type: String, default: "" },
      addressLine1: { type: String, default: "" },
      addressLine2: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "India" },
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "cod", "netbanking"],
      required: true,
      default: "card",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Completed",
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    couponCode: {
      type: String,
      default: null,
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: ["Placed", "Confirmed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Placed",
      index: true,
    },
    carrier: {
      type: String,
      default: "Express Logistics",
    },
    trackingNumber: {
      type: String,
      default: null,
    },
    estimatedDeliveryDate: {
      type: Date,
      default: null,
    },
    trackingHistory: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        description: { type: String, default: "" },
        location: { type: String, default: "Fulfillment Center" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-populate tracking details and history on initial creation
orderSchema.pre("save", function (next) {
  if (this.isNew) {
    if (!this.trackingNumber) {
      const code = this.orderId ? this.orderId.replace(/^ORD-/, "") : Date.now().toString().slice(-6);
      this.trackingNumber = `EXP-TRK-${code}`;
    }
    if (!this.estimatedDeliveryDate) {
      this.estimatedDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    }
    if (!this.trackingHistory || this.trackingHistory.length === 0) {
      this.trackingHistory = [
        {
          status: "Placed",
          timestamp: new Date(),
          description: "Order placed successfully.",
          location: "Fulfillment Center",
        },
      ];
    }
  }
  next();
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
