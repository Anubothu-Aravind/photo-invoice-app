const BusinessSetting = require("../Models/BusinessSetting");

// @desc    Get business settings for a user
// @route   GET /api/business-settings/:userId
// @access  Public
const getBusinessSettings = async (req, res) => {
  try {
    const businessSetting = await BusinessSetting.findOne({ userId: req.params.userId });
    if (businessSetting) {
      res.json(businessSetting);
    } else {
      res.status(404).json({ message: "Business settings not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create business settings
// @route   POST /api/business-settings
// @access  Public
const createBusinessSettings = async (req, res) => {
  try {
    const {
      userId,
      shopName,
      tagline,
      logoUrl,
      ownerName,
      email,
      phone,
      address,
      website,
      primaryColor,
      secondaryColor,
      defaultTaxRate,
      currency,
      invoicePrefix
    } = req.body;

    // Check if business settings already exist for this user
    const existingSettings = await BusinessSetting.findOne({ userId });
    if (existingSettings) {
      return res.status(400).json({ message: "Business settings already exist for this user" });
    }

    const businessSetting = new BusinessSetting({
      userId,
      shopName,
      tagline,
      logoUrl,
      ownerName,
      email,
      phone,
      address,
      website,
      primaryColor,
      secondaryColor,
      defaultTaxRate,
      currency: currency || "USD",
      invoicePrefix: invoicePrefix || "INV"
    });

    const createdBusinessSetting = await businessSetting.save();
    res.status(201).json(createdBusinessSetting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update business settings
// @route   PUT /api/business-settings/:userId
// @access  Public
const updateBusinessSettings = async (req, res) => {
  try {
    const businessSetting = await BusinessSetting.findOne({ userId: req.params.userId });

    if (businessSetting) {
      businessSetting.shopName = req.body.shopName || businessSetting.shopName;
      businessSetting.tagline = req.body.tagline || businessSetting.tagline;
      businessSetting.logoUrl = req.body.logoUrl || businessSetting.logoUrl;
      businessSetting.ownerName = req.body.ownerName || businessSetting.ownerName;
      businessSetting.email = req.body.email || businessSetting.email;
      businessSetting.phone = req.body.phone || businessSetting.phone;
      businessSetting.address = req.body.address || businessSetting.address;
      businessSetting.website = req.body.website || businessSetting.website;
      businessSetting.primaryColor = req.body.primaryColor || businessSetting.primaryColor;
      businessSetting.secondaryColor = req.body.secondaryColor || businessSetting.secondaryColor;
      businessSetting.defaultTaxRate = req.body.defaultTaxRate !== undefined ? req.body.defaultTaxRate : businessSetting.defaultTaxRate;
      businessSetting.currency = req.body.currency || businessSetting.currency;
      businessSetting.invoicePrefix = req.body.invoicePrefix || businessSetting.invoicePrefix;
      businessSetting.updatedAt = Date.now();

      const updatedBusinessSetting = await businessSetting.save();
      res.json(updatedBusinessSetting);
    } else {
      res.status(404).json({ message: "Business settings not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Create or update business settings
// @route   PUT /api/business-settings/:userId/upsert
// @access  Public
const upsertBusinessSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = {
      ...req.body,
      userId,
      updatedAt: Date.now()
    };

    const businessSetting = await BusinessSetting.findOneAndUpdate(
      { userId },
      updateData,
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    res.json(businessSetting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete business settings
// @route   DELETE /api/business-settings/:userId
// @access  Public
const deleteBusinessSettings = async (req, res) => {
  try {
    const businessSetting = await BusinessSetting.findOne({ userId: req.params.userId });

    if (businessSetting) {
      await BusinessSetting.findOneAndDelete({ userId: req.params.userId });
      res.json({ message: "Business settings removed" });
    } else {
      res.status(404).json({ message: "Business settings not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get invoice settings (prefix and tax rate)
// @route   GET /api/business-settings/:userId/invoice-config
// @access  Public
const getInvoiceConfig = async (req, res) => {
  try {
    const businessSetting = await BusinessSetting.findOne({ userId: req.params.userId });
    if (businessSetting) {
      res.json({
        invoicePrefix: businessSetting.invoicePrefix,
        defaultTaxRate: businessSetting.defaultTaxRate,
        currency: businessSetting.currency
      });
    } else {
      res.json({
        invoicePrefix: "INV",
        defaultTaxRate: 0,
        currency: "USD"
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBusinessSettings,
  createBusinessSettings,
  updateBusinessSettings,
  upsertBusinessSettings,
  deleteBusinessSettings,
  getInvoiceConfig,
};
