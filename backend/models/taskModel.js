const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model } = mongoose;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, { timestamps: true });

const tasks = model("tasks", taskSchema);

module.exports = tasks;