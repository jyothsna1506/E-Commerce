const User = require("../models/User");
const Product = require("../models/Product");
const { isConnected } = require("../config/db");
const memoryStore = require("../services/storageService");
const { formatUserResponse } = require("./authController");

// Helper to get product by numeric ID from whichever store is active
const findProduct = async (numId) => {
  if (isConnected()) {
    return Product.findOne({ id: numId });
  }
  return memoryStore.products.find((p) => p.id === numId);
};

// @desc   Update user profile & personalization preferences
// @route  PUT /api/users/profile
// @access Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, preferences, addresses } = req.body;
    let user = null;

    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      if (name) user.name = name.trim();
      if (phone !== undefined) user.phone = phone ? phone.trim() : null;
      if (preferences) {
        user.preferences = {
          ...user.preferences.toObject(),
          ...preferences,
        };
      }
      if (addresses && Array.isArray(addresses)) {
        user.addresses = addresses;
      }

      await user.save();
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      if (name) user.name = name.trim();
      if (phone !== undefined) user.phone = phone ? phone.trim() : null;
      if (preferences) {
        user.preferences = {
          ...user.preferences,
          ...preferences,
        };
      }
      if (addresses && Array.isArray(addresses)) {
        user.addresses = addresses;
      }
      user.updatedAt = new Date();
    }

    res.status(200).json({
      success: true,
      message: "Profile and preferences updated successfully.",
      user: formatUserResponse(user),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Record a product view
// @route  POST /api/users/recently-viewed
// @access Private
const recordRecentlyViewed = async (req, res, next) => {
  try {
    const productId = Number(req.body.productId);
    if (!productId) {
      return res.status(400).json({ success: false, error: "Valid productId is required" });
    }

    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
      if (user) {
        user.addRecentlyViewed(productId);
        await user.save();
      }
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
      if (user) {
        user.recentlyViewed = (user.recentlyViewed || []).filter((item) => item.productId !== productId);
        user.recentlyViewed.unshift({ productId, viewedAt: new Date() });
        if (user.recentlyViewed.length > 15) {
          user.recentlyViewed = user.recentlyViewed.slice(0, 15);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Product view recorded.",
      recentlyViewed: user ? user.recentlyViewed : [],
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get recently viewed products with full product details
// @route  GET /api/users/recently-viewed
// @access Private
const getRecentlyViewed = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
    }

    const rvList = user?.recentlyViewed || [];
    const populated = [];

    for (const item of rvList) {
      const prod = await findProduct(item.productId);
      if (prod) {
        populated.push({
          ...(prod.toObject ? prod.toObject() : prod),
          viewedAt: item.viewedAt,
        });
      }
    }

    res.status(200).json({
      success: true,
      count: populated.length,
      recentlyViewed: populated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get recently purchased products
// @route  GET /api/users/recently-purchased
// @access Private
const getRecentlyPurchased = async (req, res, next) => {
  try {
    let user = null;
    if (isConnected()) {
      user = await User.findById(req.user.id || req.user._id);
    } else {
      user = memoryStore.users.find((u) => u.id === req.user.id || u._id === req.user.id);
    }

    const rpList = user?.recentlyPurchased || [];
    const populated = [];

    for (const item of rpList) {
      const prod = await findProduct(item.productId);
      if (prod) {
        populated.push({
          ...(prod.toObject ? prod.toObject() : prod),
          purchasedAt: item.purchasedAt,
        });
      }
    }

    res.status(200).json({
      success: true,
      count: populated.length,
      recentlyPurchased: populated,
    });
  } catch (err) {
    next(err);
  }
};

// Helper to normalize address representation
const formatAddress = (addr) => {
  if (!addr) return null;
  const obj = addr.toObject ? addr.toObject() : { ...addr };
  const id = (obj._id || obj.id || "").toString();
  return {
    _id: id,
    id: id,
    label: obj.label || "Home",
    fullName: obj.fullName || "",
    phone: obj.phone || "",
    addressLine1: obj.addressLine1 || obj.street || "",
    addressLine2: obj.addressLine2 || "",
    street: obj.street || obj.addressLine1 || "",
    city: obj.city || "",
    state: obj.state || "",
    postalCode: obj.postalCode || obj.pincode || "",
    pincode: obj.pincode || obj.postalCode || "",
    country: obj.country || "India",
    isDefault: Boolean(obj.isDefault),
    createdAt: obj.createdAt || new Date(),
    updatedAt: obj.updatedAt || new Date(),
  };
};

// @desc   Get saved addresses for authenticated user
// @route  GET /api/users/addresses
// @access Private
const getAddresses = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    let user = null;

    if (isConnected()) {
      user = await User.findById(userId);
    } else {
      user = memoryStore.users.find((u) => u.id === userId || u._id === userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const addresses = (user.addresses || []).map(formatAddress);

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Add a new saved address
// @route  POST /api/users/addresses
// @access Private
const addAddress = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    let user = null;

    if (isConnected()) {
      user = await User.findById(userId);
    } else {
      user = memoryStore.users.find((u) => u.id === userId || u._id === userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const {
      label = "Home",
      fullName,
      phone,
      addressLine1,
      street,
      addressLine2 = "",
      city,
      state,
      postalCode,
      pincode,
      country = "India",
      isDefault,
    } = req.body || {};

    const line1 = (addressLine1 || street || "").trim();
    const pCode = (postalCode || pincode || "").trim();
    const name = (fullName || "").trim();
    const ph = (phone || "").trim();
    const ct = (city || "").trim();
    const st = (state || "").trim();

    if (!name || !ph || !line1 || !ct || !st || !pCode) {
      return res.status(400).json({
        success: false,
        error: "Full name, phone, address line 1, city, state, and postal code are required.",
      });
    }

    const validLabels = ["Home", "Work", "Other"];
    const resolvedLabel = validLabels.includes(label) ? label : "Home";

    if (!user.addresses) {
      user.addresses = [];
    }

    // Determine default status:
    // If user has 0 addresses, first one is always default.
    // Otherwise, check if isDefault is explicitly true.
    const shouldBeDefault = user.addresses.length === 0 || Boolean(isDefault);

    if (shouldBeDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    const newAddressObj = {
      label: resolvedLabel,
      fullName: name,
      phone: ph,
      addressLine1: line1,
      addressLine2: (addressLine2 || "").trim(),
      street: line1,
      city: ct,
      state: st,
      postalCode: pCode,
      pincode: pCode,
      country: (country || "India").trim(),
      isDefault: shouldBeDefault,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isConnected()) {
      user.addresses.push(newAddressObj);
      await user.save();
      const createdAddr = user.addresses[user.addresses.length - 1];
      return res.status(201).json({
        success: true,
        message: "Address added successfully",
        address: formatAddress(createdAddr),
        addresses: user.addresses.map(formatAddress),
      });
    } else {
      const generatedId = "addr-" + Date.now() + "-" + Math.floor(100 + Math.random() * 900);
      newAddressObj._id = generatedId;
      newAddressObj.id = generatedId;
      user.addresses.push(newAddressObj);
      user.updatedAt = new Date();
      return res.status(201).json({
        success: true,
        message: "Address added successfully",
        address: formatAddress(newAddressObj),
        addresses: user.addresses.map(formatAddress),
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc   Update a saved address
// @route  PUT /api/users/addresses/:addressId
// @access Private
const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { addressId } = req.params;
    let user = null;

    if (isConnected()) {
      user = await User.findById(userId);
    } else {
      user = memoryStore.users.find((u) => u.id === userId || u._id === userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find address strictly within this user's addresses
    let address = null;
    if (isConnected() && user.addresses.id) {
      address = user.addresses.id(addressId);
    }
    if (!address && user.addresses) {
      address = user.addresses.find(
        (a) => (a._id && a._id.toString() === addressId) || a.id === addressId
      );
    }

    if (!address) {
      return res.status(404).json({
        success: false,
        error: "Address not found",
      });
    }

    const {
      label,
      fullName,
      phone,
      addressLine1,
      street,
      addressLine2,
      city,
      state,
      postalCode,
      pincode,
      country,
      isDefault,
    } = req.body || {};

    if (fullName !== undefined && !fullName.trim()) {
      return res.status(400).json({ success: false, error: "Full name cannot be empty" });
    }
    if (phone !== undefined && !phone.trim()) {
      return res.status(400).json({ success: false, error: "Phone cannot be empty" });
    }
    if (addressLine1 !== undefined && !addressLine1.trim() && !street) {
      return res.status(400).json({ success: false, error: "Address line 1 cannot be empty" });
    }
    if (city !== undefined && !city.trim()) {
      return res.status(400).json({ success: false, error: "City cannot be empty" });
    }
    if (state !== undefined && !state.trim()) {
      return res.status(400).json({ success: false, error: "State cannot be empty" });
    }
    if (postalCode !== undefined && !postalCode.trim() && !pincode) {
      return res.status(400).json({ success: false, error: "Postal code cannot be empty" });
    }

    if (label !== undefined) {
      const validLabels = ["Home", "Work", "Other"];
      address.label = validLabels.includes(label) ? label : address.label || "Home";
    }
    if (fullName !== undefined) address.fullName = fullName.trim();
    if (phone !== undefined) address.phone = phone.trim();
    if (addressLine1 !== undefined || street !== undefined) {
      const line = (addressLine1 || street || "").trim();
      address.addressLine1 = line;
      address.street = line;
    }
    if (addressLine2 !== undefined) address.addressLine2 = addressLine2.trim();
    if (city !== undefined) address.city = city.trim();
    if (state !== undefined) address.state = state.trim();
    if (postalCode !== undefined || pincode !== undefined) {
      const code = (postalCode || pincode || "").trim();
      address.postalCode = code;
      address.pincode = code;
    }
    if (country !== undefined) address.country = country.trim();

    if (isDefault === true) {
      user.addresses.forEach((a) => {
        const aId = (a._id || a.id || "").toString();
        if (aId !== addressId) {
          a.isDefault = false;
        }
      });
      address.isDefault = true;
    } else if (isDefault === false && address.isDefault) {
      address.isDefault = false;
      const other = user.addresses.find(
        (a) => (a._id || a.id || "").toString() !== addressId
      );
      if (other) {
        other.isDefault = true;
      } else {
        address.isDefault = true;
      }
    }

    address.updatedAt = new Date();

    if (isConnected()) {
      await user.save();
    } else {
      user.updatedAt = new Date();
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: formatAddress(address),
      addresses: user.addresses.map(formatAddress),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete a saved address
// @route  DELETE /api/users/addresses/:addressId
// @access Private
const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { addressId } = req.params;
    let user = null;

    if (isConnected()) {
      user = await User.findById(userId);
    } else {
      user = memoryStore.users.find((u) => u.id === userId || u._id === userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const index = (user.addresses || []).findIndex(
      (a) => (a._id && a._id.toString() === addressId) || a.id === addressId
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: "Address not found",
      });
    }

    const wasDefault = Boolean(user.addresses[index].isDefault);

    if (isConnected() && user.addresses.pull) {
      const addressDoc = user.addresses.id(addressId) || user.addresses[index];
      user.addresses.pull(addressDoc._id);
    } else {
      user.addresses.splice(index, 1);
    }

    // If deleted address was default, promote the first remaining address to default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    if (isConnected()) {
      await user.save();
    } else {
      user.updatedAt = new Date();
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: user.addresses.map(formatAddress),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Set an address as default
// @route  PUT /api/users/addresses/:addressId/default
// @access Private
const setDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { addressId } = req.params;
    let user = null;

    if (isConnected()) {
      user = await User.findById(userId);
    } else {
      user = memoryStore.users.find((u) => u.id === userId || u._id === userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    let targetAddress = null;
    user.addresses.forEach((a) => {
      const match = (a._id && a._id.toString() === addressId) || a.id === addressId;
      if (match) {
        a.isDefault = true;
        targetAddress = a;
      } else {
        a.isDefault = false;
      }
    });

    if (!targetAddress) {
      return res.status(404).json({
        success: false,
        error: "Address not found",
      });
    }

    if (isConnected()) {
      await user.save();
    } else {
      user.updatedAt = new Date();
    }

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      address: formatAddress(targetAddress),
      addresses: user.addresses.map(formatAddress),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateProfile,
  recordRecentlyViewed,
  getRecentlyViewed,
  getRecentlyPurchased,
  formatAddress,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};

