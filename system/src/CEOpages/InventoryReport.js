import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Select, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const InventoryReport = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch projects from the backend when component mounts
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/project');
        if (response.status === 200) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:8000/project/${projectId}/resources`);
      if (response.status === 200) {
        setResources(response.data);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      // Handle error
    }
  };

  return (
    <Box maxW="800px" m="auto" p="20px">
      <Heading mb="20px">Inventory Report</Heading>
      <Select
        placeholder="Select a project"
        onChange={(e) => {
          setSelectedProject(e.target.value);
          handleProjectChange(e.target.value);
        }}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ))}
      </Select>
      {resources.length > 0 && (
        <Box mt="20px">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Resource Name</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resources.map((resource) => (
                <Tr key={resource.id}>
                  <Td>{resource.Inventory.name}</Td>
                  <Td>{resource.amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default InventoryReport;
