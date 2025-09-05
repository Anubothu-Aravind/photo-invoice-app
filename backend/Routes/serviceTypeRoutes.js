const express = require("express");
const {
  getServiceTypes,
  getActiveServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType,
  toggleServiceTypeStatus,
  getServiceTypesByCategory,
} = require("../controllers/serviceTypeController");

const router = express.Router();

// @route   POST /api/servicetypes
// @desc    Create new service type
// @access  Public
router.post("/", createServiceType);

// @route   GET /api/servicetypes/service/:id
// @desc    Get service type by ID
// @access  Public
router.get("/service/:id", getServiceTypeById);

// @route   PUT /api/servicetypes/:id
// @desc    Update service type
// @access  Public
router.put("/:id", updateServiceType);

// @route   PUT /api/servicetypes/:id/toggle
// @desc    Toggle service type active status
// @access  Public
router.put("/:id/toggle", toggleServiceTypeStatus);

// @route   DELETE /api/servicetypes/:id
// @desc    Delete service type
// @access  Public
router.delete("/:id", deleteServiceType);

// @route   GET /api/servicetypes/:userId
// @desc    Get all service types for a user
// @access  Public
router.get("/:userId", getServiceTypes);

// @route   GET /api/servicetypes/:userId/active
// @desc    Get active service types for a user
// @access  Public
router.get("/:userId/active", getActiveServiceTypes);

// @route   GET /api/servicetypes/:userId/category/:category
// @desc    Get service types by category
// @access  Public
router.get("/:userId/category/:category", getServiceTypesByCategory);

module.exports = router;
