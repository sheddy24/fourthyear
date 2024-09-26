import React, { useState, useEffect } from 'react';
import { getManagerDetails } from '../auth';
import axios from 'axios';
import { Box, Heading, Text, Divider, Flex, Badge } from '@chakra-ui/react';

const Pdashboard = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchAssignedProjects = async () => {
      try {
        const { token } = getManagerDetails(); // Function to retrieve authentication token
        const response = await axios.get('http://localhost:8000/projects/manager', {
          headers: {
            Authorization: token
          }
        });
        setAssignedProjects(response.data.assignedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assigned projects:', error);
      }
    };

    fetchAssignedProjects();
  }, []);

  return (
    <Flex direction="column" alignItems="center" p={8}>
      {assignedProjects.map(project => (
        <Box
          key={project.id}
          width="100%"
          bg="blue.100"
          borderRadius="lg"
          p={6}
          mb={6}
        >
          <Heading as="h2" size="lg" mb={4}>Project: {project.projectName}</Heading>
          <Text fontWeight="bold">ID:</Text>
          <Text>{project.id}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>{project.description}</Text>
          <Divider my={4} />
          <Flex justifyContent="space-between">
            <Box>
              <Text fontWeight="bold">Start Date:</Text>
              <Text>{project.startDate}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">End Date:</Text>
              <Text>{project.endDate}</Text>
            </Box>
            <Box>
              <Badge colorScheme="blue">{project.status}</Badge>
            </Box>
          </Flex>
          <Divider my={4} />
          <Flex>
            <Box>
              <Heading as="h2" size="lg" mb={4}>Supervisor:</Heading>
              <Text>{project.Supervisor.fname} {project.Supervisor.lname}</Text>
              <Text>{project.Supervisor.email}</Text>
            </Box>
            <Divider orientation="vertical" mx={4} />
            <Box>
              <Heading as="h2" size="lg" mb={4}>Workers:</Heading>
              {project.Workers.map(worker => (
                <div key={worker.email}>
                  <Text>{worker.fname} {worker.lname}</Text>
                  <Text>{worker.email}</Text>
                </div>
              ))}
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default Pdashboard;
