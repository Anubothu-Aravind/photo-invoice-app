const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clientName: String,
  email: String,
  phone: String,
  address: String,
  location: String,
  totalSpent: { type: Number, default: 0 },
  totalInvoices: { type: Number, default: 0 },
  lastInvoiceDate: Date,
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);
