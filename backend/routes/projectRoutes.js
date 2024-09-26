const express = require("express");
const { Project,Task, ResourceAllocation ,Inventory} = require("../models");


const router = express.Router();

router.post("/create-project", async (req, res) => {
  try {
    const { projectName, description, startDate, endDate, budget, status } =
      req.body;
    await Project.create({
      projectName: projectName,
      description: description,
      startDate: startDate,
      endDate: endDate,
      budget: budget,
      status: status,
    });
    res.json("project created successfully");
  } catch (error) {
    console.log(error.message);
  }
});

// get all the projects
router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.findAll();
    res.json(allProjects);
  } catch (error) {
    console.log(error.message);
  }
});


//delete the project by
router.delete("/projects/:id", async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project by ID
    const project = await Project.findByPk(projectId);

    // If the project doesn't exist, return 404 Not Found
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }


    // Delete the project
    await project.destroy();

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/projects/edit/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(projectId);
    const { projectName, description, startDate, endDate, budget, status } = req.body;

    // Find the project by ID
    const project = await Project.findByPk(projectId);

    // If the project doesn't exist, return 404 Not Found
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update project details
    project.projectName = projectName;
    project.description = description;
    project.startDate = startDate;
    project.endDate = endDate;
    project.budget = budget;
    project.status = status;

    // Save the updated project
    await project.save();

    return res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET route to fetch tasks for a specific project by project ID
router.get("/:projectId/tasks", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.findAll({ where: { projectid: projectId } });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:projectId/resources", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const resources = await ResourceAllocation.findAll({
      where: { projectId },
      include: [{ model: Inventory, attributes: ['name'] }],
    });
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
