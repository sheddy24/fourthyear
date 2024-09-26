const express = require("express");
const { users, ProjectAssignment, Project } = require("../models");
const authenticateMiddleware = require("../authMiddleware");

const router = express.Router();

router.get("/manager", authenticateMiddleware, async (req, res) => {
  try {
    // Retrieve assigned projects for the manager
    const pManagerId = req.userId;
    const assignedProjects = await ProjectAssignment.findAll({
      where: { manager_id: pManagerId },
      include: [
        {
          model: Project,
          attributes: [
            "id",
            "projectName",
            "description",
            "startDate",
            "endDate",
            "budget",
            "status",
          ],
        },
        {
          model: users,
          as: "Supervisor",
          attributes: ["fname", "lname", "email"], // Include only selected attributes
        },
        {
          model: users,
          as: "Worker",
          attributes: ["fname", "lname", "email"], // Include only selected attributes
        },
      ],
    });
    // Group projects by id to remove duplicates
    const uniqueProjects = assignedProjects.reduce((acc, project) => {
      if (!acc[project.ProjectId]) {
        acc[project.ProjectId] = {
          ...project.Project.toJSON(),
          Supervisor: project.Supervisor,
          Workers: [project.Worker],
        };
      } else {
        acc[project.ProjectId].Workers.push(project.Worker);
      }
      return acc;
    }, {});

    // Convert object to array
    const projectArray = Object.values(uniqueProjects);
    res.json({ assignedProjects: projectArray });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//assigned projects for the site supervisor
router.get("/supervisor", authenticateMiddleware, async (req, res) => {
  try {
    const siteSupervisorId = req.userId;
    const assignedProjects = await ProjectAssignment.findAll({
      where: { supervisor_id: siteSupervisorId },
      include: [
        {
          model: Project,
          attributes: [
            "id",
            "projectName",
            "description",
            "startDate",
            "endDate",
            "budget",
            "status",
          ],
        },
        {
          model: users,
          as: "Manager",
          attributes: ["id", "fname", "lname", "email"],
        },
        {
          model: users,
          as: "Worker",
          attributes: ["id", "fname", "lname", "email"],
        },
      ],
    });

    // Group workers by project
    const groupedProjects = assignedProjects.reduce((acc, current) => {
      const projectId = current.ProjectId;
      if (!acc[projectId]) {
        acc[projectId] = {
          ...current.Project.toJSON(),
          Manager: current.Manager.toJSON(),
          Workers: [],
        };
      }
      acc[projectId].Workers.push(current.Worker.toJSON());
      return acc;
    }, {});

    // Convert grouped projects object to array

    const uniqueProjects = Object.values(groupedProjects);
    res.json({ assignedProjects: uniqueProjects });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//assigned projects for the worker
router.get("/worker", authenticateMiddleware, async (req, res) => {
  try {
    const workerID = req.userId;

    // Fetch assigned projects along with associated manager, supervisor, and worker details
    const assignedProjects = await ProjectAssignment.findAll({
      where: { worker_id: workerID },
      include: [
        {
          model: Project,
          attributes: ["id", "projectName", "description", "startDate", "endDate", "budget", "status"],
        },
        {
          model: users,
          as: "Manager",
          attributes: ["id", "fname", "lname", "email"],
        },
        {
          model: users,
          as: "Supervisor",
          attributes: ["id", "fname", "lname", "email"],
        },
        {
          model: users,
          as: "Worker",
          attributes: ["id", "fname", "lname", "email"],
        },
      ],
    });

    res.json({ projects: assignedProjects });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
