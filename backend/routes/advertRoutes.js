const express = require("express");
const { Adverts } = require("../models");

const router = express.Router();

router.post("/create-advert", async (req, res) => {
  try {
    //destructure them from the request body
    const { role, description, requirements } = req.body;

    //create the advert
    const advert = await Adverts.create({
      role: role,
      description: description,
      requirements: requirements,
    });

    return res
      .status(201)
      .json({ message: "Advertisement created successfully", advert });
  } catch (error) {
    console.error("Error creating advertisement:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get all the adverts from the database using this API
router.get("/", async (req, res) => {
  try {
    const adverts = await Adverts.findAll();

    return res.status(200).json({ adverts });
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an advert
router.delete("/:id", async (req, res) => {
  try {
    const advertId = req.params.id;

    // Find the advert by ID
    const advert = await Adverts.findByPk(advertId);

    // If the advert doesn't exist, return 404 Not Found
    if (!advert) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    // Delete the advert
    await advert.destroy();

    return res.status(200).json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    console.error("Error deleting advertisement:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const advertId = req.params.id;
    const { role, description, requirements } = req.body;

    // Find the advertisement by ID
    const advert = await Adverts.findByPk(advertId);

    // If the advertisement doesn't exist, return 404 Not Found
    if (!advert) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    // Update advertisement details
    advert.role = role;
    advert.description = description;
    advert.requirements = requirements;

    // Save the updated advertisement
    await advert.save();

    return res.status(200).json({ message: "Advertisement updated successfully" });
  } catch (error) {
    console.error("Error updating advertisement:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
