import React, { useState, useEffect } from "react";
import {
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { getToken } from "../auth";

export default function ReturnItems() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [resources, setResources] = useState([]);
  const [returnQuantity, setReturnQuantity] = useState("");
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [error, setError] = useState("");

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

  const fetchResourcesForProject = async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/inventory/project/${projectId}`
      );
      setResources(response.data.resources);
    } catch (error) {
      console.error("Error fetching resources for project:", error);
    }
  };

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const handleProjectChange = (e) => {
    const selectedProjectId = e.target.value;
    setProjectId(selectedProjectId);
    fetchResourcesForProject(selectedProjectId);
  };

  const handleReturnResource = (resource) => {
    console.log(resource);
    setSelectedResource(resource);
    setShowReturnModal(true);
  };

  const handleCloseReturnModal = () => {
    setShowReturnModal(false);
    setReturnQuantity("");
    setSelectedResource(null);
    setError("");
  };

  const handleReturnQuantityChange = (e) => {
    setReturnQuantity(e.target.value);
    setError("");
  };


  const handleSubmitReturn = async () => {
    try {
      const { stoken } = getToken();
      await axios.put(
        `http://localhost:8000/inventory/resource/return/${selectedResource.id}`,
        { quantity: returnQuantity },
        {
          headers: {
            Authorization: stoken,
          },
        }
      );
      setShowReturnModal(false);
      setReturnQuantity("");
      setSelectedResource(null);
      setError("");
      // Refresh resource data
      fetchResourcesForProject(projectId);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error returning resource. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Return Items</h1>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <label htmlFor="projectId">Select Project:</label>
        <Select
          id="projectId"
          value={projectId}
          onChange={handleProjectChange}
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.projectName}
            </option>
          ))}
        </Select>
      </div>
      <div style={{ margin: "20px auto", maxWidth: "600px" }}>
        <h2 style={{ textAlign: "center" }}>Resources for Selected Project</h2>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Amount</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {resources.map((resource) => (
              <Tr key={resource.id}>
                <Td>{resource.name}</Td>
                <Td>{resource.amount}</Td>
                <Td>
                  <Button onClick={() => handleReturnResource(resource)}>
                    Return
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {/* Return Resource Modal */}
      <Modal isOpen={showReturnModal} onClose={handleCloseReturnModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Return Resource</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="returnQuantity">
                Quantity to Return:
              </FormLabel>
              <Input
                id="returnQuantity"
                type="number"
                value={returnQuantity}
                onChange={handleReturnQuantityChange}
                isRequired
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseReturnModal}>Cancel</Button>
            <Button colorScheme="blue" ml={3} onClick={handleSubmitReturn}>
              Return
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
