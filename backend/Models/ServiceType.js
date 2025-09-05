const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceName: String,
  category: String,
  defaultPrice: Number,
  description: String,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("ServiceType", serviceTypeSchema);
