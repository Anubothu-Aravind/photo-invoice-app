const mongoose = require("mongoose");

const businessSettingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shopName: String,
  tagline: String,
  logoUrl: String,
  ownerName: String,
  email: String,
  phone: String,
  address: String,
  website: String,
  primaryColor: String,
  secondaryColor: String,
  defaultTaxRate: Number,
  currency: String,
  invoicePrefix: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BusinessSetting", businessSettingSchema);
