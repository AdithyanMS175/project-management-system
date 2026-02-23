const Task = require("../models/taskModel");

// Get tasks by project
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

// Add task 
exports.addTask = async (req, res) => {
  try {
    const { title, status, assignedTo } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json("Task title is required");
    }

    const newTask = await Task.create({
      title: title.trim(),
      status: status || "todo",
      project: req.params.projectId,
      assignedTo: assignedTo || null,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json("Task Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

// Toggle task status 
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json("Task not found");
    }

    if (task.status === "todo") {
      task.status = "in-progress";
    } else if (task.status === "in-progress") {
      task.status = "done";
    } else {
      task.status = "todo";
    }

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};