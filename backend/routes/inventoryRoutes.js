const express = require("express");
const { Inventory,ResourceAllocation } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

router.post("/create-resource", async (req, res) => {
  try {
    const { name, quantity, description, unit } = req.body; // Extracting description from request body

    const inventory = await Inventory.create({
      name: name,
      quantity: quantity,
      description: description,
      unit: unit,
      // Including description when creating inventory
    });
    return res
      .status(201)
      .json({ message: "Resource created successfully", inventory });
  } catch (error) {
    console.error("Error creating resource:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch all resources from the database
    const resources = await Inventory.findAll();

    // Check if resources exist
    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: "No resources found" });
    }

    // Send the resources in the response
    return res.status(200).json({ resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const { quantity } = req.body;

    // Find the resource by name
    const resource = await Inventory.findOne({ where: { name: name } });

    // Check if resource exists
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Update the quantity of the resource
    resource.quantity = quantity;
    const updatedResource = await resource.save();

    // Send the updated resource in the response
    return res
      .status(200)
      .json({ message: "Resource updated successfully", updatedResource });
  } catch (error) {
    console.error("Error updating resource:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/project/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch resource allocations for the specified project from the database
    const resourceAllocations = await ResourceAllocation.findAll({
      where: { projectId: projectId },
      include: [{
        model: Inventory,
        required: true,
        where: { description: { [Op.ne]: 'consumable' } } // Filter out consumable resources
      }],
      attributes: ['amount'] // Include the 'amount' attribute from the ResourceAllocation table
    });

    // Extract resources from resource allocations along with the name from Inventory
    const resources = resourceAllocations.map(ra => ({
      name: ra.Inventory.name,
      amount: ra.amount,
      id:ra.Inventory.id
    }));
   

    // Check if resources exist
    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: "No resources found for this project" });
    }

    // Send the resources in the response
    return res.status(200).json({ resources });
  } catch (error) {
    console.error("Error fetching resources for project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/resource/return/:id", async (req, res) => {
  try {
    const resourceId = req.params.id;
    const { quantity } = req.body;

    // Retrieve the resource allocation for the specified resource ID
    const resourceAllocation = await ResourceAllocation.findOne({ where: { resourceId: resourceId } });
    console.log(resourceAllocation);

    if (!resourceAllocation) {
      return res.status(404).json({ message: "Resource allocation not found" });
    }

    // Check if the requested return quantity exceeds the allocated quantity
    if (quantity > resourceAllocation.amount) {
      return res.status(400).json({ message: "Return quantity exceeds allocated quantity" });
    }

    // Retrieve the inventory for the specified resource ID
    const inventory = await Inventory.findByPk(resourceId);

    // Calculate the new quantity in ResourceAllocation
    const newAmount = resourceAllocation.amount - quantity;
    console.log(newAmount);

    // Calculate the new quantity in Inventory
    const newInventoryQuantity = Number(inventory.quantity) + Number(quantity);
    console.log(newInventoryQuantity);

    // Update ResourceAllocation
    await resourceAllocation.update({ amount: newAmount });

    // Update Inventory
    await inventory.update({ quantity: newInventoryQuantity });

    // Remove resource allocation if amount becomes zero
    if (newAmount === 0) {
      await resourceAllocation.destroy();
    }

    return res.status(200).json({ message: "Resources returned successfully" });
  } catch (error) {
    console.error("Error returning resources:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
