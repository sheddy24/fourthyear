import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../auth';
import { Flex, Box, Heading, Text, Badge, Divider } from '@chakra-ui/react';

export default function Sdashboard() {
  const [assignedProjects, setAssignedProjects] = useState([]);

  useEffect(() => {
    const fetchAssignedProjects = async () => {
      try {
        const { stoken } = getToken(); // Function to retrieve authentication token
        console.log(`token ${stoken}`);
        const response = await axios.get('http://localhost:8000/projects/supervisor', {
          headers: {
            Authorization: stoken
          }
        });
        setAssignedProjects(response.data.assignedProjects);
      } catch (error) {
        console.error('Error fetching assigned projects:', error);
      }
    };
    
  
    fetchAssignedProjects();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" bgGradient="linear(to-r, teal.200, blue.500)">
      <Heading as="h1" mb={8} color="white">Assigned Projects</Heading>
      <Flex direction="column">
        {assignedProjects.map(project => (
          <Box key={project.id} p={6} m={4} borderWidth="1px" borderRadius="lg" bg="white" width="100%">
            <Heading as="h2" size="md">{project.projectName}</Heading>
            <Text mb={2}><strong>ID:</strong> {project.id}</Text>
            <Text mb={2}><strong>Description:</strong> {project.description}</Text>
            <Text mb={2}><strong>Start Date:</strong> {formatDate(project.startDate)}</Text>
            <Text mb={2}><strong>End Date:</strong> {formatDate(project.endDate)}</Text>
            <Text mb={2}><strong>Budget:</strong> {project.budget}</Text>
            <Badge colorScheme={project.status === 'Completed' ? 'green' : 'orange'}>{project.status}</Badge>
            <Divider mt={4} />
            <Flex direction="row">
              <Box flex="1">
                <Heading as="h3" size="sm" mt={4}>Manager:</Heading>
                <Text mb={2}><strong>Name:</strong> {project.Manager.fname} {project.Manager.lname}</Text>
                <Text mb={2}><strong>Email:</strong> {project.Manager.email}</Text>
              </Box>
              <Box flex="1">
                <Heading as="h3" size="sm" mt={4}>Workers:</Heading>
                {project.Workers.map(worker => (
                  <Box key={worker.id} mb={2}>
                    <Text><strong>Name:</strong> {worker.fname} {worker.lname}</Text>
                    <Text><strong>Email:</strong> {worker.email}</Text>
                  </Box>
                ))}
              </Box>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
