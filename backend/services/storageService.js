// Resilient In-Memory Storage & Repository Layer
// Allows seamless testing and offline development when MongoDB daemon is not running.
const bcrypt = require("bcryptjs");
const { defaultProducts } = require("../scripts/seed");

// In-memory collections initialized with verified catalog
const memoryStore = {
  products: [...defaultProducts],
  users: [],
  orders: [],
};

// Seed a demo user for immediate testing if desired
(async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password123", salt);
  memoryStore.users.push({
    _id: "demo-user-1",
    id: "demo-user-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    phone: "9876543210",
    password: hashedPassword,
    preferences: {
      ageRange: "25-34",
      preferredCategories: ["fashion", "electronics"],
      clothingSize: "L",
      shoeSize: "10",
      preferredStyles: ["Casual", "Athleisure"],
    },
    recentlyViewed: [
      { productId: 1, viewedAt: new Date(Date.now() - 3600000) },
      { productId: 4, viewedAt: new Date(Date.now() - 1800000) },
      { productId: 11, viewedAt: new Date(Date.now() - 900000) },
    ],
    recentlyPurchased: [
      { productId: 4, purchasedAt: new Date(Date.now() - 86400000) },
    ],
    cart: [
      { _id: "cart-item-1", productId: 1, quantity: 2, selectedVariant: "L" },
    ],
    wishlist: [6, 12, 17],
    addresses: [
      {
        _id: "addr-demo-1",
        id: "addr-demo-1",
        label: "Home",
        fullName: "Alex Morgan",
        phone: "9876543210",
        addressLine1: "42 Tech Boulevard, Suite 500",
        addressLine2: "",
        street: "42 Tech Boulevard, Suite 500",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560001",
        pincode: "560001",
        country: "India",
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
})();

module.exports = memoryStore;
