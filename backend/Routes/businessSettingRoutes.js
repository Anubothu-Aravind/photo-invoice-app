const express = require("express");
const {
  getBusinessSettings,
  createBusinessSettings,
  updateBusinessSettings,
  upsertBusinessSettings,
  deleteBusinessSettings,
  getInvoiceConfig,
} = require("../controllers/businessSettingController");

const router = express.Router();

// @route   POST /api/business-settings
// @desc    Create business settings
// @access  Public
router.post("/", createBusinessSettings);

// @route   GET /api/business-settings/:userId
// @desc    Get business settings for a user
// @access  Public
router.get("/:userId", getBusinessSettings);

// @route   PUT /api/business-settings/:userId
// @desc    Update business settings
// @access  Public
router.put("/:userId", updateBusinessSettings);

// @route   PUT /api/business-settings/:userId/upsert
// @desc    Create or update business settings
// @access  Public
router.put("/:userId/upsert", upsertBusinessSettings);

// @route   DELETE /api/business-settings/:userId
// @desc    Delete business settings
// @access  Public
router.delete("/:userId", deleteBusinessSettings);

// @route   GET /api/business-settings/:userId/invoice-config
// @desc    Get invoice configuration (prefix, tax rate, currency)
// @access  Public
router.get("/:userId/invoice-config", getInvoiceConfig);

module.exports = router;
