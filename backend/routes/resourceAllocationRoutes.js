const express = require("express");
const router = express.Router();
const { ResourceAllocation, Inventory } = require("../models");

router.post("/allocate", async (req, res) => {
  try {
    const { projectId, resourceId, amount } = req.body;

    // Validate input
    if (!projectId || !resourceId || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    // Check if sufficient quantity available
    const inventoryItem = await Inventory.findByPk(resourceId);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const allocatedQuantity = await ResourceAllocation.sum("amount", {
      where: { resourceId },
    });
    const availableQuantity = inventoryItem.quantity - allocatedQuantity;
    if (amount > availableQuantity) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity available" });
    }

    // Create resource allocation
    await ResourceAllocation.create({
      projectId,
      resourceId,
      amount,
    });

    // Update inventory quantity
    const remainingQuantity = inventoryItem.quantity - amount;
    await inventoryItem.update({ quantity: remainingQuantity });

    return res.status(201).json({ message: "Resource allocated successfully" });
  } catch (error) {
    console.error("Error allocating resources:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
