const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceType: String,
  category: String,
  description: String,
  price: Number,
  notes: String,
  sortOrder: Number,
  createdAt: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema({
  paymentDate: Date,
  amount: Number,
  paymentMethod: String,
  transactionReference: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  invoiceNumber: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  invoiceDate: Date,
  eventDate: Date,
  photographerName: String,
  studio: {
    name: String,
    address: String,
    phone: String,
    email: String,
  },
  client: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  subtotal: Number,
  taxRate: Number,
  taxAmount: Number,
  discount: {
    percentage: Number,
    amount: Number,
  },
  totalAmount: Number,
  status: { type: String, default: "pending" },
  paymentStatus: { type: String, default: "unpaid" },
  notes: String,
  services: [serviceSchema],
  payments: [paymentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
