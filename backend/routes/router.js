const express = require('express')
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const adminController = require("../controllers/adminController");
const adminMiddleware = require('../middlewares/adminMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)


// PROJECT ROUTES
router.post("/createprojects", adminMiddleware, projectController.createProject);
router.get("/projects", jwtMiddleware, projectController.getProjects);
router.delete("/projects/:id", adminMiddleware, projectController.deleteProject);

// TASK ROUTES

router.get("/tasks/:projectId", jwtMiddleware, taskController.getTasks);
router.post("/tasks/:projectId", adminMiddleware, taskController.addTask);
router.delete("/tasks/:taskId", adminMiddleware, taskController.deleteTask);
router.patch("/tasks/toggle/:taskId", jwtMiddleware, taskController.toggleTask);

// ADMIN USER MANAGEMENT ROUTES
router.get("/users", adminMiddleware, adminController.getUsers);
router.delete("/users/:id", adminMiddleware, adminController.deleteUser);


module.exports = router;