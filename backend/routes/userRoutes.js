const express = require("express");
const router = express.Router();
const {
  updateProfile,
  recordRecentlyViewed,
  getRecentlyViewed,
  getRecentlyPurchased,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.put("/profile", updateProfile);
router.post("/recently-viewed", recordRecentlyViewed);
router.get("/recently-viewed", getRecentlyViewed);
router.get("/recently-purchased", getRecentlyPurchased);

// Address Book Endpoints
router.get("/addresses", getAddresses);
router.post("/addresses", addAddress);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);
router.put("/addresses/:addressId/default", setDefaultAddress);

module.exports = router;
