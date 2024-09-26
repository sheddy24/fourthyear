import React, { useState, useEffect } from "react";
import axios from "axios";
import { getWorkerDetails } from "../auth";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Badge,
} from "@chakra-ui/react";

const Wdashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const wtoken = getWorkerDetails();
        const response = await axios.get(
          "http://localhost:8000/projects/worker",
          {
            headers: {
              Authorization: wtoken,
            },
          }
        );

        // Format date for each project
        const formattedProjects = response.data.projects.map((project) => ({
          ...project,
          Project: {
            ...project.Project,
            startDate: new Date(project.Project.startDate).toLocaleDateString(),
            endDate: new Date(project.Project.endDate).toLocaleDateString(),
          },
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Worker Dashboard
      </Heading>
      <List spacing={3}>
        {projects.map((project) => (
          <ListItem key={project.Project.id} bg="gray.100" p={4} borderRadius="md">
            <Heading as="h3" size="md">
              {project.Project.projectName}{" "}
              <Badge colorScheme="green">{project.Project.status}</Badge>
            </Heading>
            <Text mt={2}>{project.Project.description}</Text>
            <Text>
              <strong>Start Date:</strong> {project.Project.startDate}
            </Text>
            <Text>
              <strong>End Date:</strong> {project.Project.endDate}
            </Text>
            <Text>
              <strong>Budget:</strong> {project.Project.budget}
            </Text>
            <Text>
              <strong>Manager:</strong> {project.Manager.fname}{" "}
              {project.Manager.lname} ({project.Manager.email})
            </Text>
            <Text>
              <strong>Supervisor:</strong> {project.Supervisor.fname}{" "}
              {project.Supervisor.lname} ({project.Supervisor.email})
            </Text>
            <Text>
              <strong>Worker:</strong> {project.Worker.fname}{" "}
              {project.Worker.lname} ({project.Worker.email})
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Wdashboard;
