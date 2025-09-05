const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get("/", getUsers);

// @route   POST /api/users
// @desc    Create new user
// @access  Public
router.post("/", createUser);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get("/:id", getUserById);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Public
router.put("/:id", updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Public
router.delete("/:id", deleteUser);

module.exports = router;
