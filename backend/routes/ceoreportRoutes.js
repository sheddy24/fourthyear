const express = require('express');
const router = express.Router();
const { Project, Task, ResourceAllocation, WorkerRegister, Inventory, Adverts } = require('../models');

// Project Reports
router.get('/project-reports', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching project reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task Reports
router.get('/task-reports', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: Project, attributes: ['projectName'] }] // Include the associated Project model and specify the attributes to retrieve
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching task reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Resource Allocation Reports
router.get('/resource-allocation-reports', async (req, res) => {
  try {
    const resourceAllocations = await ResourceAllocation.findAll();
    res.json(resourceAllocations);
  } catch (error) {
    console.error('Error fetching resource allocation reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Worker Reports
router.get('/worker-reports', async (req, res) => {
  try {
    const workers = await WorkerRegister.findAll();
    res.json(workers);
  } catch (error) {
    console.error('Error fetching worker reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Inventory Reports
router.get('/inventory-reports', async (req, res) => {
  try {
    const inventoryItems = await Inventory.findAll();
    res.json(inventoryItems);
  } catch (error) {
    console.error('Error fetching inventory reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Adverts Reports
router.get('/adverts-reports', async (req, res) => {
  try {
    const adverts = await Adverts.findAll();
    res.json(adverts);
  } catch (error) {
    console.error('Error fetching adverts reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
