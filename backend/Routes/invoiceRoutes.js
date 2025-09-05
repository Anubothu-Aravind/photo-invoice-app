const express = require("express");
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  addPayment,
  updatePaymentStatus,
  getInvoiceStats,
  getRecentInvoices,
} = require("../controllers/invoiceController");

const router = express.Router();

// @route   POST /api/invoices
// @desc    Create new invoice
// @access  Public
router.post("/", createInvoice);

// @route   GET /api/invoices/invoice/:id
// @desc    Get invoice by ID
// @access  Public
router.get("/invoice/:id", getInvoiceById);

// @route   PUT /api/invoices/:id
// @desc    Update invoice
// @access  Public
router.put("/:id", updateInvoice);

// @route   DELETE /api/invoices/:id
// @desc    Delete invoice
// @access  Public
router.delete("/:id", deleteInvoice);

// @route   POST /api/invoices/:id/payments
// @desc    Add payment to invoice
// @access  Public
router.post("/:id/payments", addPayment);

// @route   PUT /api/invoices/:id/payment-status
// @desc    Update payment status
// @access  Public
router.put("/:id/payment-status", updatePaymentStatus);

// @route   GET /api/invoices/:userId
// @desc    Get all invoices for a user (with pagination and filters)
// @access  Public
router.get("/:userId", getInvoices);

// @route   GET /api/invoices/:userId/stats
// @desc    Get invoice statistics
// @access  Public
router.get("/:userId/stats", getInvoiceStats);

// @route   GET /api/invoices/:userId/recent
// @desc    Get recent invoices
// @access  Public
router.get("/:userId/recent", getRecentInvoices);

module.exports = router;
