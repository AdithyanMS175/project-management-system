const users = require("../models/userModel");
const Task = require("../models/taskModel");
const projects = require("../models/projectModel");

// Get all users (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const list = await users.find().sort({ createdAt: -1 }).select("-password");
    res.status(200).json({ users: list });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

// Delete a user (and clean up their assignments)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await users.findByIdAndDelete(userId);

    // remove this user from projects/tasks assignments
    await projects.updateMany(
      { assignedTo: userId },
      { $unset: { assignedTo: "" } }
    );

    await Task.updateMany(
      { assignedTo: userId },
      { $unset: { assignedTo: "" } }
    );

    res.status(200).json("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

