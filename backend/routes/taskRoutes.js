// routes/tasks.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//const authorizeTaskCreation = require('../taskCreationMiddleware'); // Import your authorization middleware
const { Task, ProjectAssignment, Project } = require("../models"); // Import your Task, ProjectAssignment, and Project models

/// POST /api/tasks
router.post("/create-task", async (req, res) => {
  try {
    const { projectid, date, taskname, deadline } = req.body;

    // Create task in the database
    const task = await Task.create({ projectid, date, taskname, deadline });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/worker", async (req, res) => {
  try {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;

    // Assuming you have a secret key for JWT verification
    const secretKey = "web_master"; // Replace with your actual secret key

    // Verify the JWT token
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId; // Assuming the token payload has a 'userId' field

    // Find project assignment for the worker
    const assignments = await ProjectAssignment.findAll({
      where: { worker_id: userId },
      include: [
        {
          model: Project,
          attributes: ["id"], // Include project ID only
        },
      ],
    });

    // Check if there are any assignments
    if (assignments.length === 0) {
      return res
        .status(404)
        .json({ message: "No project assigned to the worker" });
    }

    // Extract the project ID from the assignment
    const projectId = assignments[0].Project.id; // Assuming the column name is 'id'

    // If the project ID is null or undefined, respond with an appropriate message
    if (!projectId) {
      return res
        .status(404)
        .json({ message: "No project assigned to the worker" });
    }

    // Now find all tasks that belong to the project ID we've extracted
    const tasks = await Task.findAll({
      where: { projectid: projectId },
      include: [
        {
          model: Project,
          attributes: ["projectName"], // Include project details
        },
      ],
    });

    res.status(200).json(tasks);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Failed to authenticate token" });
    } else {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

//manager route

router.get("/manager", async (req, res) => {
  try {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;

    // Assuming you have a secret key for JWT verification
    const secretKey = "web_master"; // Replace with your actual secret key

    // Verify the JWT token
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId; // Assuming the token payload has a 'userId' field

    // Find project assignments where the manager is the assigned user
    const assignments = await ProjectAssignment.findAll({
      where: { manager_id: userId }, // Adjust to match your column name
      attributes: [], // We don't need any attributes from ProjectAssignment itself
      include: [
        {
          model: Project,
          attributes: ["id", "projectName"], // Include the project name
          include: [
            {
              model: Task,
              attributes: ["taskid", "taskname", "date"], // Include the task details you need
            },
          ],
        },
      ],
    });

    console.log(assignments);

    // Use a Set to keep track of unique project IDs
    const projectIds = new Set();
    const uniqueProjectsWithTasks = [];

    // Iterate over assignments to filter out duplicates
    assignments.forEach((assignment) => {
      const projectId = assignment.Project.id;
      if (!projectIds.has(projectId)) {
        projectIds.add(projectId);
        uniqueProjectsWithTasks.push(assignment.Project);
      }
    });

    console.log("Unique projects:", uniqueProjectsWithTasks);

    res.status(200).json(uniqueProjectsWithTasks);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Failed to authenticate token" });
    } else {
      console.error("Error fetching projects and tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.get("/supervisor", async (req, res) => {
  try {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;

    // Assuming you have a secret key for JWT verification
    const secretKey = "web_master"; // Replace with your actual secret key

    // Verify the JWT token
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId; // Assuming the token payload has a 'userId' field

    // Find project assignments for the site supervisor
    const assignments = await ProjectAssignment.findAll({
      where: { supervisor_id: userId },
      include: [
        {
          model: Project,
          attributes: ["id", "projectName"], // Include project ID and name
          include: [
            {
              model: Task,
              attributes: ["taskid", "taskname", "date", "deadline","status"], // Include task details
            },
          ],
        },
      ],
    });

    // Use a Set to keep track of unique project IDs
    const projectIds = new Set();
    const uniqueProjectsWithTasks = [];

    // Iterate over assignments to filter out duplicates
    assignments.forEach((assignment) => {
      const projectId = assignment.Project.id;
      if (!projectIds.has(projectId)) {
        projectIds.add(projectId);
        uniqueProjectsWithTasks.push(assignment.Project);
      }
    });

    res.status(200).json(uniqueProjectsWithTasks);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Failed to authenticate token" });
    } else {
      console.error("Error fetching projects and tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.put("/mark-complete/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    // If task is not found, return 404 Not Found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the status to 'complete'
    task.status = 'complete';
    await task.save();

    // Return the updated task
    return res.status(200).json({ message: "Task marked as completed", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
