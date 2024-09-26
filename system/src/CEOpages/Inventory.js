import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  VStack,
  Select,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

export default function Inventory({ onAddResource, onUpdateResource }) {
  const [newResource, setNewResource] = useState({
    name: "",
    quantity: 0,
    description: "", 
    unit: "", // Add unit state
  });
  const [updateResource, setUpdateResource] = useState({
    name: null,
    quantity: 0,
  });
  const [resourceNames, setResourceNames] = useState([]);

  useEffect(() => {
    // Fetch all resource names when the component mounts
    fetchResourceNames();
  }, []);

  const fetchResourceNames = async () => {
    try {
      const response = await axios.get("http://localhost:8000/inventory");
      const resources = response.data.resources;
      const names = resources.map((resource) => resource.name);
      setResourceNames(names);
    } catch (error) {
      console.error("Error fetching resource names:", error);
    }
  };

  const handleAddResource = async () => {
    try {
      // Make an HTTP POST request to add a new resource
      await axios.post("http://localhost:8000/inventory/create-resource", {
        name: newResource.name,
        quantity: newResource.quantity,
        description: newResource.description,
        unit: newResource.unit, // Include unit
      });
      fetchResourceNames();
      // Clear the form fields after successful addition
      setNewResource({ name: "", quantity: 0, description: "", unit: "" });
    } catch (error) {
      console.error("Error adding resource:", error);
      // Handle errors if necessary
    }
  };

  const handleUpdateResource = async () => {
    try {
      // Make an HTTP PUT request to update an existing resource
      console.log("Updating resource with name:", updateResource.name);
      await axios.put(
        `http://localhost:8000/inventory/update/${updateResource.name}`,
        {
          quantity: updateResource.quantity,
        }
      );

      // If the request is successful, update the state or perform any other actions
      //onUpdateResource(updateResource.name, updateResource.quantity);

      // Clear the form fields after successful update
      setUpdateResource({ name: null, quantity: 0 });
    } catch (error) {
      console.error("Error updating resource:", error);
      // Handle errors if necessary
    }
  };

  return (
    <Box p="4" maxW={"500px"} marginX={"auto"} mt={"50px"}>
      <Heading mb="4">Inventory Management</Heading>
      {/* Form for adding a new resource */}
      <VStack align="start" spacing="4" mb="4">
        <Heading size="md" mb="2">
          Add New Resource
        </Heading>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={newResource.name}
            onChange={(e) =>
              setNewResource({ ...newResource, name: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Select
            value={newResource.description}
            onChange={(e) =>
              setNewResource({ ...newResource, description: e.target.value })
            }
          >
            <option value="">Select Description</option>
            <option value="Consumable">Consumable</option>
            <option value="Non-Consumable">Non-Consumable</option>
          </Select>
        </FormControl>
        <FormControl id="unit"> {/* New FormControl for unit */}
          <FormLabel>Unit</FormLabel>
          <Input
            type="text"
            value={newResource.unit}
            onChange={(e) =>
              setNewResource({ ...newResource, unit: e.target.value })
            }
          />
        </FormControl>
        <FormControl id="quantity">
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            value={newResource.quantity}
            onChange={(e) =>
              setNewResource({ ...newResource, quantity: e.target.value })
            }
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleAddResource}>
          Add Resource
        </Button>
      </VStack>
      <Divider mb="4" />
      {/* Form for updating existing resource quantity */}
      <VStack align="start" spacing="4">
        <Heading size="md" mb="2">
          Update Resource Quantity
        </Heading>
        <FormControl id="resourceName">
          <FormLabel>Resource Name</FormLabel>
          <Select
            value={updateResource.name}
            onChange={(e) =>
              setUpdateResource({ ...updateResource, name: e.target.value })
            }
          >
            <option value={null} disabled>
              Select Resource
            </option>
            {resourceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="quantity">
          <FormLabel>New Quantity</FormLabel>
          <Input
            type="number"
            value={updateResource.quantity}
            onChange={(e) =>
              setUpdateResource({ ...updateResource, quantity: e.target.value })
            }
          />
        </FormControl>
        <Button colorScheme="green" onClick={handleUpdateResource}>
          Update Quantity
        </Button>
      </VStack>
    </Box>
  );
}
