const express = require('express');
const router = express.Router();
const { WorkerRegister, ProjectAssignment, users,Project } = require('../models'); // Import your WorkerRegister, ProjectAssignment, and User models
const jwt = require('jsonwebtoken'); // Import JWT for token verification
const { Op } = require('sequelize');

// POST route to mark attendance
router.post('/mark-attendance', async (req, res) => {
  const { attendanceStatus } = req.body; // Assuming you're sending attendanceStatus in the request body
  const token = req.headers.authorization;
  const secretKey = "web_master";
  
  try {
    // Verify the JWT token to get the worker's ID
    const decodedToken = jwt.verify(token, secretKey);
    console.log("Decoded token:", decodedToken); // Log the decoded token
    const workerId = decodedToken.userId;

    // Find the project assignment associated with the worker
    const projectAssignment = await ProjectAssignment.findOne({
      where: { worker_id: workerId },
      include: [{ model: users, as: 'Worker' }]
    });

    if (!projectAssignment) {
      return res.status(404).json({ message: 'Project assignment not found for worker' });
    }

    // Get the project ID from the project assignment
    const projectId = projectAssignment.ProjectId;

    // Create a new entry in the WorkerRegister table
    const newAttendance = await WorkerRegister.create({
      date: new Date(), // Use current date
      status: attendanceStatus,
      userId: workerId,
      ProjectId: projectId, // Assign the project ID
      approvalStatus: 'pending'
    });

    res.status(201).json({ message: 'Attendance marked successfully', attendance: newAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking attendance' });
  }
});

// GET route to fetch attendance summary
router.get('/attendance/summary', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const secretKey = "web_master";
    const decodedToken = jwt.verify(token, secretKey);
    const workerId = decodedToken.userId; // Extract worker ID from JWT token

    // Calculate attendance summary
    const attendanceSummary = await WorkerRegister.findAndCountAll({
      where: {
        userId: workerId,
        status: {
          [Op.in]: ['present', 'absent']
        }
      },
      attributes: ['status', 'approvalStatus'], // Include only necessary attributes
      raw: true // Get raw data
    });

    // Initialize counts
    let presentDays = 0;
    let absentDays = 0;
    let approvedDays = 0;
    let pendingDays = 0;
    let disapprovedDays = 0;

    // Calculate counts based on the fetched data
    attendanceSummary.rows.forEach(record => {
      if (record.status === 'present') {
        presentDays++;
      } else if (record.status === 'absent') {
        absentDays++;
      }

      if (record.approvalStatus === 'approved') {
        approvedDays++;
      } else if (record.approvalStatus === 'pending') {
        pendingDays++;
      } else if (record.approvalStatus === 'disapproved') {
        disapprovedDays++;
      }
    });

    // Send the attendance summary as response
    res.json({
      presentDays,
      absentDays,
      approvedDays,
      pendingDays,
      disapprovedDays
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch attendance summary' });
  }
});


router.get('/attendance/approval', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const secretKey = "web_master";
    const decodedToken = jwt.verify(token, secretKey);
    const supervisorId = decodedToken.userId;

    // Find all projects assigned to the supervisor
    const projectAssignments = await ProjectAssignment.findAll({
      where: {
        supervisor_id: supervisorId // Find projects where the supervisor is assigned
      },
      include: [{
        model: Project // Include the Project model to get project details
      }]
    });

    // Initialize an object to store unique project details with workers needing approval
    const projectsWithWorkersNeedingApproval = {};

    // Loop through each project assignment to find workers needing approval
    for (const projectAssignment of projectAssignments) {
      const project = projectAssignment.Project;

      // Find workers for this project whose approval status is 'pending'
      const pendingWorkers = await WorkerRegister.findAll({
        where: {
          ProjectId: project.id, // Filter workers by project ID
          approvalStatus: 'pending'
        },
        include: [{
          model: users,
          as: 'user', // Include the associated user details from the users table
          attributes: ['fname', 'lname',] // Include only necessary attributes
        }]
      });

      // Add project details with pending workers to the object
      if (!projectsWithWorkersNeedingApproval[project.id]) {
        projectsWithWorkersNeedingApproval[project.id] = {
          projectName: project.projectName,
          projectId:project.id,
          workers: pendingWorkers.map(worker => ({
            workerName: `${worker.user.fname} ${worker.user.lname}`,
            workerId:worker.userId,
            status: worker.status // Marked status (present or absent)
          }))
        };
      }
    }
    console.log(projectsWithWorkersNeedingApproval);

    // Convert the object to an array
    const projectsArray = Object.values(projectsWithWorkersNeedingApproval);

    // Send the list of projects with workers needing approval to the frontend
    res.json({ projectsWithWorkersNeedingApproval: projectsArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch workers needing approval' });
  }
});

// Endpoint to approve worker attendance
router.put('/attendance/approval/approve/:projectId/:workerId', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const secretKey = "web_master";
    const decodedToken = jwt.verify(token, secretKey);
    const supervisorId = decodedToken.userId;

    // Check if the supervisor is assigned to the project
    const projectAssignment = await ProjectAssignment.findOne({
      where: {
        supervisor_id: supervisorId,
        ProjectId: req.params.projectId
      }
    });

    if (!projectAssignment) {
      return res.status(403).json({ message: 'Supervisor is not authorized to approve for this project' });
    }

    // Update the approval status for the worker's attendance to 'approved'
    await WorkerRegister.update(
      { approvalStatus: 'approved' },
      {
        where: {
          ProjectId: req.params.projectId,
          userId: req.params.workerId
        }
      }
    );

    res.status(200).json({ message: 'Attendance approval successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to approve attendance' });
  }
});

// Endpoint to disapprove worker attendance
router.put('/attendance/approval/disapprove/:projectId/:workerId', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const secretKey = "web_master";
    const decodedToken = jwt.verify(token, secretKey);
    const supervisorId = decodedToken.userId;

    // Check if the supervisor is assigned to the project
    const projectAssignment = await ProjectAssignment.findOne({
      where: {
        supervisor_id: supervisorId,
        ProjectId: req.params.projectId
      }
    });

    if (!projectAssignment) {
      return res.status(403).json({ message: 'Supervisor is not authorized to disapprove for this project' });
    }

    // Update the approval status for the worker's attendance to 'disapproved'
    await WorkerRegister.update(
      { approvalStatus: 'disapproved' },
      {
        where: {
          ProjectId: req.params.projectId,
          userId: req.params.workerId
        }
      }
    );

    res.status(200).json({ message: 'Attendance disapproval successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to disapprove attendance' });
  }
});


module.exports = router;
