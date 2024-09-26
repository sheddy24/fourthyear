const express = require("express");
const router = express.Router();
const { ProjectUpdate ,Project  } = require("../models");

router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: ProjectUpdate,
                    attributes: ['progress'], // Fetch only the progress attribute from ProjectUpdate
                    required: false
                }
            ],
            attributes: ['projectName', 'startDate', 'endDate'] // Fetch only these attributes from Project
        });
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
