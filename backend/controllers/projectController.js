const projects = require("../models/projectModel");


exports.createProject = async (req, res) => {
  console.log("inside createProject Controller");
  try {
    const { name, description, assignedTo } = req.body;
    console.log(name, description, assignedTo);

    if (!name || !name.trim()) {
      return res.status(400).json("Project name is required");
    }

    
    let createdById = null;
    if (req.payload) {
      try {
        const users = require("../models/userModel");
        const creator = await users.findOne({ email: req.payload });
        if (creator) {
          createdById = creator._id;
        }
      } catch (lookupErr) {
        console.log("Error resolving createdBy user:", lookupErr);
      }
    }

    const newProject = await projects.create({
      name: name.trim(),
      description,
      assignedTo: assignedTo || null,
      createdBy: createdById,
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};


exports.getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const role = req.role || req.userRole || null;
    const userEmail = req.payload;

  
    let query = {};

    if (role !== "admin" && userEmail) {
  
      const users = require("../models/userModel");
      const currentUser = await users.findOne({ email: userEmail });
      if (currentUser) {
        query = { assignedTo: currentUser._id };
      } else {
        return res.status(200).json({
          projects: [],
          totalPages: 0,
          currentPage: page,
        });
      }
    }

    const total = await projects.countDocuments(query);

    const projectList = await projects
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      projects: projectList,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};



exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    await projects.findByIdAndDelete(projectId);

   
    const Task = require("../models/taskModel");
    await Task.deleteMany({ project: projectId });

    res.status(200).json("Project and related tasks deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};