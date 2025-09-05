const Client = require("../Models/Client");

// @desc    Get all clients for a user
// @route   GET /api/clients/:userId
// @access  Public
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ userId: req.params.userId });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get client by ID
// @route   GET /api/clients/client/:id
// @access  Public
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('userId');
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new client
// @route   POST /api/clients
// @access  Public
const createClient = async (req, res) => {
  try {
    const {
      userId,
      clientName,
      email,
      phone,
      address,
      location,
      status
    } = req.body;

    const client = new Client({
      userId,
      clientName,
      email,
      phone,
      address,
      location,
      status: status || "active",
      totalSpent: 0,
      totalInvoices: 0
    });

    const createdClient = await client.save();
    res.status(201).json(createdClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Public
const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (client) {
      client.clientName = req.body.clientName || client.clientName;
      client.email = req.body.email || client.email;
      client.phone = req.body.phone || client.phone;
      client.address = req.body.address || client.address;
      client.location = req.body.location || client.location;
      client.status = req.body.status || client.status;
      client.updatedAt = Date.now();

      const updatedClient = await client.save();
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update client stats (total spent, invoices count)
// @route   PUT /api/clients/:id/stats
// @access  Public
const updateClientStats = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (client) {
      const { totalSpent, totalInvoices, lastInvoiceDate } = req.body;
      
      if (totalSpent !== undefined) client.totalSpent = totalSpent;
      if (totalInvoices !== undefined) client.totalInvoices = totalInvoices;
      if (lastInvoiceDate) client.lastInvoiceDate = lastInvoiceDate;
      client.updatedAt = Date.now();

      const updatedClient = await client.save();
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Public
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (client) {
      await Client.findByIdAndDelete(req.params.id);
      res.json({ message: "Client removed" });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search clients by name or email
// @route   GET /api/clients/:userId/search?q=searchterm
// @access  Public
const searchClients = async (req, res) => {
  try {
    const { userId } = req.params;
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const clients = await Client.find({
      userId,
      $or: [
        { clientName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  updateClientStats,
  deleteClient,
  searchClients,
};
