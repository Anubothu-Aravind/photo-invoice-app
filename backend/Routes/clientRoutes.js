const express = require("express");
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  updateClientStats,
  deleteClient,
  searchClients,
} = require("../controllers/clientController");

const router = express.Router();

// @route   POST /api/clients
// @desc    Create new client
// @access  Public
router.post("/", createClient);

// @route   GET /api/clients/client/:id
// @desc    Get client by ID
// @access  Public
router.get("/client/:id", getClientById);

// @route   PUT /api/clients/:id
// @desc    Update client
// @access  Public
router.put("/:id", updateClient);

// @route   PUT /api/clients/:id/stats
// @desc    Update client stats
// @access  Public
router.put("/:id/stats", updateClientStats);

// @route   DELETE /api/clients/:id
// @desc    Delete client
// @access  Public
router.delete("/:id", deleteClient);

// @route   GET /api/clients/:userId
// @desc    Get all clients for a user
// @access  Public
router.get("/:userId", getClients);

// @route   GET /api/clients/:userId/search
// @desc    Search clients by name or email
// @access  Public
router.get("/:userId/search", searchClients);

module.exports = router;
