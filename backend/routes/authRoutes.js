const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  phoneLogin,
  googleAuth,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validate");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/phone-login", phoneLogin);
router.post("/google", googleAuth);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;
