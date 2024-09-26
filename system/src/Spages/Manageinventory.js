import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { getToken } from "../auth";


export default function ManageInventory() {
  const [inventory, setInventory] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [visibleResources, setVisibleResources] = useState(4); // Initial number of resources to display

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/inventory");
      setInventory(response.data.resources);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  
  const fetchAssignedProjects = async () => {
    try {
      const { stoken } = getToken();
      const response = await axios.get(
        "http://localhost:8000/assign/superviosr/assigned",
        {
          headers: {
            Authorization: stoken,
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching assigned projects:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchAssignedProjects();
  }, []);

  const handleAllocation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/resource/allocate", {
        projectId,
        resourceId,
        amount,
      });
      // Refresh inventory data
      fetchInventory();
      // Reset form fields
      setProjectId("");
      setResourceId("");
      setAmount("");
    } catch (error) {
      console.error("Error allocating resources:", error);
    }
  };

  const filteredResources = inventory.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleViewMore = () => {
    setVisibleResources(visibleResources + 6); // Increase the number of visible resources
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Inventory</h1>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Input
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Table variant="simple" size="md" width="100%" mt="20px">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Unit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredResources.slice(0, visibleResources).map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.unit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {filteredResources.length > visibleResources && !showAll && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Button onClick={handleViewMore}>View More</Button>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          width: "600px",
          margin: "auto",
        }}
      >
        <h2>Allocate Resources</h2>
        <form onSubmit={handleAllocation}>
          <FormControl>
            <FormLabel htmlFor="projectId">Project:</FormLabel>
            <Select
              id="projectId"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectName}
                </option>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel htmlFor="resourceId">Resource name:</FormLabel>
            <Select
              id="resourceId"
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              required
            >
              <option value="">Select Resource</option>
              {filteredResources.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.unit})
                </option>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel htmlFor="amount">Amount:</FormLabel>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </FormControl>
          <br />
          <Button type="submit" colorScheme="blue">
            Allocate
          </Button>
        </form>
      </div>
    </div>
  );
}
