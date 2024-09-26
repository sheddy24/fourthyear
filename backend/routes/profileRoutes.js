const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { users } = require("../models");

// Route to fetch user profile by userid
router.get("/manager", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  // Extract token from Authorization header

  try {
    // Decode token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const userId = decoded.userId;
    console.log(userId);
    // Fetch user profile based on userid
    const profile = await users.findByPk(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/supervisor", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  // Extract token from Authorization header

  try {
    // Decode token to extract userid
    const decoded = jwt.verify(token, "web_master"); // Replace 'your_secret_key' with your actual secret key
    const userId = decoded.userId;

    // Fetch user profile based on userid
    const profile = await users.findByPk(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/worker", async (req, res) => {
  const token = req.headers.authorization;

  // Extract token from Authorization header

  try {
    // Decode token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const userId = decoded.userId;

    // Fetch user profile based on userid
    const profile = await users.findByPk(userId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/manager/edit", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const { fname, lname, email, username } = req.body;

  try {
    // Verify token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const managerId = decoded.userId;

    // Update the manager's profile in the database
    const updatedManager = await users.update(
      { fname, lname, email, username },
      { where: { id: managerId }, returning: true }
    );

    if (updatedManager[0] === 0) {
      return res.status(404).json({ error: "Manager profile not found" });
    }

    res.json(updatedManager[1][0]); // Return the updated manager profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/supervisor/edit", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const { fname, lname, email, username } = req.body;

  try {
    // Verify token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const supervisorId = decoded.userId;

    // Update the manager's profile in the database
    const updatedSupervisor = await users.update(
      { fname, lname, email, username },
      { where: { id: supervisorId }, returning: true }
    );

    if (updatedSupervisor[0] === 0) {
      return res.status(404).json({ error: "Manager profile not found" });
    }

    res.json(updatedSupervisor[1][0]); // Return the updated manager profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/worker/edit", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const { fname, lname, email, username } = req.body;

  try {
    // Verify token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const workerId = decoded.userId;

    // Update the manager's profile in the database
    const updatedWorker = await users.update(
      { fname, lname, email, username },
      { where: { id: workerId }, returning: true }
    );

    if (updatedWorker[0] === 0) {
      return res.status(404).json({ error: "Manager profile not found" });
    }

    res.json(updatedWorker[1][0]); // Return the updated manager profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//manager updating password
router.put("/manager/change-password", async (req, res) => {
  const token = req.headers.authorization;
  const { currentPassword, newPassword } = req.body;

  try {
    // Verify token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const managerId = decoded.userId;

    // Fetch manager's profile from the database
    const manager = await users.findByPk(managerId);

    if (!manager) {
      return res.status(404).json({ error: "Manager profile not found" });
    }

    // Compare the provided current password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      manager.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the manager's password in the database
    await manager.update({ password: hashedNewPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/supervisor/change-password", async (req, res) => {
  const token = req.headers.authorization;
  const { currentPassword, newPassword } = req.body;

  try {
    // Verify token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const supervisorId = decoded.userId;

    // Fetch supervisor's profile from the database
    const supervisor = await users.findByPk(supervisorId);

    if (!supervisor) {
      return res.status(404).json({ error: "Supervisor profile not found" });
    }

    // Compare the provided current password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      supervisor.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the supervisor's password in the database
    await supervisor.update({ password: hashedNewPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/worker/change-password", async (req, res) => {
  const token = req.headers.authorization;
  const { currentPassword, newPassword } = req.body;

  try {
    // Verify token to extract userid
    const decoded = jwt.verify(token, "web_master");
    const workerId = decoded.userId;

    // Fetch worker's profile from the database
    const worker = await users.findByPk(workerId);

    if (!worker) {
      return res.status(404).json({ error: "Worker profile not found" });
    }

    // Compare the provided current password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      worker.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the worker's password in the database
    await worker.update({ password: hashedNewPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
