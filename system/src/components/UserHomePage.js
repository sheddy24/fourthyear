import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const UserHomePage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data
    axios
      .get("http://localhost:8000/progress/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <Box bg="gray.50" p={4} minHeight="100vh">
      <Center>
        <SimpleGrid columns={3} spacing={4} width="100%">
          {projects.map((project) => (
            <Box
              key={project.id}
              bg="white"
              p={4}
              borderRadius="xl"
              boxShadow="md"
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {project.projectName}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                Start Date: {new Date(project.startDate).toLocaleDateString()}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                End Date: {new Date(project.endDate).toLocaleDateString()}
              </Text>
              <Box mt={2}>
                <CircularProgress
                  value={project.ProjectUpdate?.progress || 0}
                  size="100px"
                  color="blue.400"
                >
                  <CircularProgressLabel>
                    {project.ProjectUpdate?.progress || 0}%
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default UserHomePage;
