// routes/projectUpdates.js
const express = require("express");
const router = express.Router();
const { ProjectUpdate, Project } = require("../models");

// Create project update
// Create project update
router.post("/create", async (req, res) => {
  const { projectName, progress, budgetused } = req.body;
  console.log(req.body);

  try {
    // Find the project by name
    const project = await Project.findOne({ where: { projectName } });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Create project update
    const newProjectUpdate = await ProjectUpdate.create({
      projectId:project.id,
      progress,
      budgetused,
    });
    return res.status(201).json(newProjectUpdate);
  } catch (error) {
    console.error("Error creating project update:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update project update
router.put("/:id/update", async (req, res) => {
  const { id } = req.params;
  const { projectName, progress, budgetused } = req.body;
  console.log(req.params);

  try {
    // Find the project by ID
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update project update
    const updatedProjectUpdate = await ProjectUpdate.update(
      {
        progress,
        budgetused,
      },
      { where: {projectId: id } }
    );
    return res.status(200).json(updatedProjectUpdate);
  } catch (error) {
    console.error("Error updating project update:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
