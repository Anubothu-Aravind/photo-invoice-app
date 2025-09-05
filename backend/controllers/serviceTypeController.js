const ServiceType = require("../Models/ServiceType");

// @desc    Get all service types for a user
// @route   GET /api/servicetypes/:userId
// @access  Public
const getServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType.find({ userId: req.params.userId });
    res.json(serviceTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get active service types for a user
// @route   GET /api/servicetypes/:userId/active
// @access  Public
const getActiveServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType.find({ 
      userId: req.params.userId, 
      isActive: true 
    });
    res.json(serviceTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get service type by ID
// @route   GET /api/servicetypes/service/:id
// @access  Public
const getServiceTypeById = async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id).populate('userId');
    if (serviceType) {
      res.json(serviceType);
    } else {
      res.status(404).json({ message: "Service type not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new service type
// @route   POST /api/servicetypes
// @access  Public
const createServiceType = async (req, res) => {
  try {
    const {
      userId,
      serviceName,
      category,
      defaultPrice,
      description,
      isActive
    } = req.body;

    const serviceType = new ServiceType({
      userId,
      serviceName,
      category,
      defaultPrice,
      description,
      isActive: isActive !== undefined ? isActive : true
    });

    const createdServiceType = await serviceType.save();
    res.status(201).json(createdServiceType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update service type
// @route   PUT /api/servicetypes/:id
// @access  Public
const updateServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id);

    if (serviceType) {
      serviceType.serviceName = req.body.serviceName || serviceType.serviceName;
      serviceType.category = req.body.category || serviceType.category;
      serviceType.defaultPrice = req.body.defaultPrice !== undefined ? req.body.defaultPrice : serviceType.defaultPrice;
      serviceType.description = req.body.description || serviceType.description;
      serviceType.isActive = req.body.isActive !== undefined ? req.body.isActive : serviceType.isActive;

      const updatedServiceType = await serviceType.save();
      res.json(updatedServiceType);
    } else {
      res.status(404).json({ message: "Service type not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete service type
// @route   DELETE /api/servicetypes/:id
// @access  Public
const deleteServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id);

    if (serviceType) {
      await ServiceType.findByIdAndDelete(req.params.id);
      res.json({ message: "Service type removed" });
    } else {
      res.status(404).json({ message: "Service type not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle service type active status
// @route   PUT /api/servicetypes/:id/toggle
// @access  Public
const toggleServiceTypeStatus = async (req, res) => {
  try {
    const serviceType = await ServiceType.findById(req.params.id);

    if (serviceType) {
      serviceType.isActive = !serviceType.isActive;
      const updatedServiceType = await serviceType.save();
      res.json(updatedServiceType);
    } else {
      res.status(404).json({ message: "Service type not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get service types by category
// @route   GET /api/servicetypes/:userId/category/:category
// @access  Public
const getServiceTypesByCategory = async (req, res) => {
  try {
    const { userId, category } = req.params;
    const serviceTypes = await ServiceType.find({ 
      userId, 
      category,
      isActive: true 
    });
    res.json(serviceTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServiceTypes,
  getActiveServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType,
  toggleServiceTypeStatus,
  getServiceTypesByCategory,
};
