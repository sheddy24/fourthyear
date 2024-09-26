const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users, ProjectAssignment, Project } = require("../models");

const router = express.Router();

//session set up

router.post("/login/ceo", async (req, res) => {
  try {
    const { username, password } = req.body;

    const ceoUser = await users.findOne({
      where: {
        username: username,
        role: "CEO",
      },
    });

    if (!ceoUser) {
      return res.status(404).json({ error: "CEO user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, ceoUser.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: ceoUser.id }, "web_master", {
        expiresIn: "1h",
      });

      res.json("login successfull");
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//project manager
router.post("/login/manager", async (req, res) => {
  try {
    const { username, password } = req.body;

    const pManager = await users.findOne({
      where: {
        username: username,
        role: "project-manager",
      },
    });

    if (!pManager) {
      return res.status(404).json({ error: "manager  not found" });
    }

    const passwordMatch = await bcrypt.compare(password, pManager.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: pManager.id }, "web_master", {
        expiresIn: "1h",
      });

      res.json({ token: token, username: username });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//site supervisor
router.post("/login/supervisor", async (req, res) => {
  try {
    const { username, password } = req.body;

    const siteSupervisor = await users.findOne({
      where: {
        username: username,
        role: "site-supervisor",
      },
    });

    if (!siteSupervisor) {
      return res.status(404).json({ error: "supervisor  not found" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      siteSupervisor.password
    );

    if (passwordMatch) {
      const token = jwt.sign({ userId: siteSupervisor.id }, "web_master", {
        expiresIn: "1h",
      });
      res.json({ token: token, username: username });
      console.log(token);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//onsite worker
router.post("/login/worker", async (req, res) => {
  try {
    const { username, password } = req.body;

    const worker = await users.findOne({
      where: {
        username: username,
        role: "onsite-worker",
      },
    });

    if (!worker) {
      return res.status(404).json({ error: "worker  not found" });
    }

    const passwordMatch = await bcrypt.compare(password, worker.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: worker.id }, "web_master", {
        expiresIn: "1h",
      });

      // Retrieve assigned projects for the worker
      res.json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
