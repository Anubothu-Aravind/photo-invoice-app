const Invoice = require("../Models/Invoice");
const Client = require("../Models/Client");

// @desc    Get all invoices for a user
// @route   GET /api/invoices/:userId
// @access  Public
const getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentStatus } = req.query;
    const query = { userId: req.params.userId };

    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const invoices = await Invoice.find(query)
      .populate('clientId', 'clientName email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Invoice.countDocuments(query);

    res.json({
      invoices,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get invoice by ID
// @route   GET /api/invoices/invoice/:id
// @access  Public
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('userId', 'email')
      .populate('clientId', 'clientName email phone address location');
    
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Public
const createInvoice = async (req, res) => {
  try {
    const {
      userId,
      invoiceNumber,
      clientId,
      invoiceDate,
      eventDate,
      photographerName,
      studio,
      client,
      subtotal,
      taxRate,
      taxAmount,
      discount,
      totalAmount,
      status,
      paymentStatus,
      notes,
      services
    } = req.body;

    const invoice = new Invoice({
      userId,
      invoiceNumber,
      clientId,
      invoiceDate,
      eventDate,
      photographerName,
      studio,
      client,
      subtotal,
      taxRate,
      taxAmount,
      discount,
      totalAmount,
      status: status || "pending",
      paymentStatus: paymentStatus || "unpaid",
      notes,
      services: services || []
    });

    const createdInvoice = await invoice.save();

    // Update client stats if clientId is provided
    if (clientId) {
      await updateClientStats(clientId);
    }

    res.status(201).json(createdInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Public
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      const oldClientId = invoice.clientId;
      
      invoice.invoiceNumber = req.body.invoiceNumber || invoice.invoiceNumber;
      invoice.clientId = req.body.clientId || invoice.clientId;
      invoice.invoiceDate = req.body.invoiceDate || invoice.invoiceDate;
      invoice.eventDate = req.body.eventDate || invoice.eventDate;
      invoice.photographerName = req.body.photographerName || invoice.photographerName;
      invoice.studio = req.body.studio || invoice.studio;
      invoice.client = req.body.client || invoice.client;
      invoice.subtotal = req.body.subtotal !== undefined ? req.body.subtotal : invoice.subtotal;
      invoice.taxRate = req.body.taxRate !== undefined ? req.body.taxRate : invoice.taxRate;
      invoice.taxAmount = req.body.taxAmount !== undefined ? req.body.taxAmount : invoice.taxAmount;
      invoice.discount = req.body.discount || invoice.discount;
      invoice.totalAmount = req.body.totalAmount !== undefined ? req.body.totalAmount : invoice.totalAmount;
      invoice.status = req.body.status || invoice.status;
      invoice.paymentStatus = req.body.paymentStatus || invoice.paymentStatus;
      invoice.notes = req.body.notes || invoice.notes;
      invoice.services = req.body.services || invoice.services;
      invoice.updatedAt = Date.now();

      const updatedInvoice = await invoice.save();

      // Update client stats for both old and new client if changed
      if (oldClientId) {
        await updateClientStats(oldClientId);
      }
      if (invoice.clientId && invoice.clientId !== oldClientId) {
        await updateClientStats(invoice.clientId);
      }

      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Public
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      const clientId = invoice.clientId;
      await Invoice.findByIdAndDelete(req.params.id);

      // Update client stats after deletion
      if (clientId) {
        await updateClientStats(clientId);
      }

      res.json({ message: "Invoice removed" });
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add payment to invoice
// @route   POST /api/invoices/:id/payments
// @access  Public
const addPayment = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      const { paymentDate, amount, paymentMethod, transactionReference, notes } = req.body;

      const payment = {
        paymentDate,
        amount,
        paymentMethod,
        transactionReference,
        notes
      };

      invoice.payments.push(payment);

      // Calculate total payments
      const totalPaid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
      
      // Update payment status
      if (totalPaid >= invoice.totalAmount) {
        invoice.paymentStatus = "paid";
      } else if (totalPaid > 0) {
        invoice.paymentStatus = "partial";
      } else {
        invoice.paymentStatus = "unpaid";
      }

      invoice.updatedAt = Date.now();
      const updatedInvoice = await invoice.save();

      // Update client stats
      if (invoice.clientId) {
        await updateClientStats(invoice.clientId);
      }

      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update payment status
// @route   PUT /api/invoices/:id/payment-status
// @access  Public
const updatePaymentStatus = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      invoice.paymentStatus = req.body.paymentStatus;
      invoice.updatedAt = Date.now();

      const updatedInvoice = await invoice.save();

      // Update client stats
      if (invoice.clientId) {
        await updateClientStats(invoice.clientId);
      }

      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get invoice statistics
// @route   GET /api/invoices/:userId/stats
// @access  Public
const getInvoiceStats = async (req, res) => {
  try {
    const userId = req.params.userId;

    const totalInvoices = await Invoice.countDocuments({ userId });
    const paidInvoices = await Invoice.countDocuments({ userId, paymentStatus: "paid" });
    const pendingInvoices = await Invoice.countDocuments({ userId, paymentStatus: "unpaid" });
    const partialInvoices = await Invoice.countDocuments({ userId, paymentStatus: "partial" });

    // Calculate total revenue
    const paidInvoicesData = await Invoice.find({ userId, paymentStatus: "paid" });
    const totalRevenue = paidInvoicesData.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    // Calculate pending amount
    const unpaidInvoicesData = await Invoice.find({ userId, paymentStatus: { $in: ["unpaid", "partial"] } });
    const pendingAmount = unpaidInvoicesData.reduce((sum, invoice) => {
      const totalPaid = invoice.payments.reduce((paidSum, payment) => paidSum + payment.amount, 0);
      return sum + (invoice.totalAmount - totalPaid);
    }, 0);

    res.json({
      totalInvoices,
      paidInvoices,
      pendingInvoices,
      partialInvoices,
      totalRevenue,
      pendingAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent invoices
// @route   GET /api/invoices/:userId/recent
// @access  Public
const getRecentInvoices = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const invoices = await Invoice.find({ userId: req.params.userId })
      .populate('clientId', 'clientName')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to update client statistics
const updateClientStats = async (clientId) => {
  try {
    const invoices = await Invoice.find({ clientId });
    const totalInvoices = invoices.length;
    const totalSpent = invoices
      .filter(invoice => invoice.paymentStatus === "paid")
      .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    
    const lastInvoice = invoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    const lastInvoiceDate = lastInvoice ? lastInvoice.createdAt : null;

    await Client.findByIdAndUpdate(clientId, {
      totalSpent,
      totalInvoices,
      lastInvoiceDate,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error("Error updating client stats:", error);
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  addPayment,
  updatePaymentStatus,
  getInvoiceStats,
  getRecentInvoices,
};
