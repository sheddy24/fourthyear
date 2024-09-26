const express = require("express");
const { ProjectAssignment, Project, users } = require("../models");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/assign-project", async (req, res) => {
  try {
    const { projectName, managerName, supervisorName, workerNames } = req.body;

    // Retrieve the ID of the project, manager, and supervisor from the database
    const project = await Project.findOne({ where: { projectName } });
    const manager = await users.findOne({
      where: { fname: managerName, role: "project-manager" },
    });
    const supervisor = await users.findOne({
      where: { fname: supervisorName, role: "site-supervisor" },
    });

    if (!project || !manager || !supervisor) {
      return res
        .status(404)
        .json({ message: "One or more entities not found." });
    }

    // Retrieve the IDs of selected workers from the database
    const selectedWorkers = await users.findAll({
      where: { fname: workerNames, role: "onsite-worker" },
    });

    // Create ProjectAssignment records for each selected worker
    const assignments = await Promise.all(
      selectedWorkers.map(async (worker) => {
        return await ProjectAssignment.create({
          ProjectId: project.id,
          manager_id: manager.id,
          supervisor_id: supervisor.id,
          worker_id: worker.id,
        });
      })
    );

    return res
      .status(201)
      .json({ message: "Project assigned successfully.", assignments });
  } catch (error) {
    console.error("Error assigning project:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Assuming you have an Express route for fetching projects
//for manager
router.get("/projects/assigned", async (req, res) => {
  const token = req.headers.authorization; // Assuming the token is passed in the Authorization header

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, "web_master");

    // Extract the manager's ID from the decoded token
    const managerId = decodedToken.userId; // Adjust the property name based on your token structure

    // Use the manager's ID to fetch projects they are assigned to
    const projectAssignments = await ProjectAssignment.findAll({
      where: {
        manager_id: managerId,
      },
      include: [{ model: Project }],
    });

    // Use a set to store unique project IDs
    const uniqueProjects = new Set();

    // Iterate through projectAssignments to filter duplicates
    const projects = projectAssignments.reduce((filteredProjects, assignment) => {
      const projectId = assignment.Project.id;
      if (!uniqueProjects.has(projectId)) {
        // Add project ID to set
        uniqueProjects.add(projectId);
        // Add project to filteredProjects
        filteredProjects.push(assignment.Project);
      }
      return filteredProjects;
    }, []);

    // Send the filtered projects list as a response
    res.json(projects);
  } catch (error) {
    // Handle errors, such as invalid token or database query errors
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




router.get("/superviosr/assigned", async (req, res) => {
  const stoken = req.headers.authorization; // Assuming the token is passed in the Authorization header

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(stoken, "web_master");

    // Extract the manager's ID from the decoded token
    const supervisorId = decodedToken.userId; // Adjust the property name based on your token structure

    // Use the manager's ID to fetch projects they are assigned to
    const projectAssignments = await ProjectAssignment.findAll({
      where: {
        supervisor_id: supervisorId,
      },
      include: [{ model: Project }],
    });

    // Use a set to store unique project IDs
    const uniqueProjects = new Set();

    // Iterate through projectAssignments to filter duplicates
    const projects = projectAssignments.reduce((filteredProjects, assignment) => {
      const projectId = assignment.Project.id;
      if (!uniqueProjects.has(projectId)) {
        // Add project ID to set
        uniqueProjects.add(projectId);
        // Add project to filteredProjects
        filteredProjects.push(assignment.Project);
      }
      return filteredProjects;
    }, []);

    // Send the filtered projects list as a response
    res.json(projects);
  } catch (error) {
    // Handle errors, such as invalid token or database query errors
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
