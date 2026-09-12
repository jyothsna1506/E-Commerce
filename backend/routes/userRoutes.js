const express = require("express");
const router = express.Router();
const {
  updateProfile,
  recordRecentlyViewed,
  getRecentlyViewed,
  getRecentlyPurchased,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.put("/profile", updateProfile);
router.post("/recently-viewed", recordRecentlyViewed);
router.get("/recently-viewed", getRecentlyViewed);
router.get("/recently-purchased", getRecentlyPurchased);

module.exports = router;
