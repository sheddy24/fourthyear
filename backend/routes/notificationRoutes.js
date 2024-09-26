// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const {Notification}=require('../models')
// Assuming your models are exported from a single file

// POST route to create a new notification
router.post('/supervisor/notification', async (req, res) => {
  try {
    const { description,name,email } = req.body;
     // Assuming you have middleware to extract the supervisor ID from the token

    // Create the notification using the Notification model
    const notification = await Notification.create({
      description,
      name,
      email
    });

    // Respond with the created notification
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/manager/notification', async (req, res) => {
    try {
      const { description, name, email } = req.body;
  
      // Create the notification using the Notification model
      const notification = await Notification.create({
        description,
        name,
        email
      });
  
      // Respond with the created notification
      res.status(201).json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // POST route to create a new notification for worker
router.post('/worker/notification', async (req, res) => {
    try {
      const { description, name, email } = req.body;
  
      // Create the notification using the Notification model
      const notification = await Notification.create({
        description,
        name,
        email
      });
  
      // Respond with the created notification
      res.status(201).json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/notifications', async (req, res) => {
    try {
      // Fetch recent notifications from database
      const notifications = await Notification.findAll({
        attributes: ['id', 'name', 'email', 'description', 'createdAt'], // Specify fields to fetch
        order: [['createdAt', 'DESC']], // Order by creation date in descending order
        limit: 10, // Limit the number of notifications to fetch
      });
  
      // Respond with the fetched notifications
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
