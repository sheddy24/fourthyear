import React, { useState, useEffect } from "react";
import axios from "axios";
import { getManagerDetails } from "../auth";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Select,
  useToast,
} from "@chakra-ui/react";

export default function ProjectUpdates() {
  const [projects, setProjects] = useState([]);
  const [createProject, setCreateProject] = useState("");
  const [createProgress, setCreateProgress] = useState("");
  const [createBudgetused, setCreateBudgetused] = useState("");

  const [updateProject, setUpdateProject] = useState("");
  const [updateProgress, setUpdateProgress] = useState("");
  const [updateBudgetused, setUpdateBudgetused] = useState("");

  const toast = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { token } = getManagerDetails();
      const response = await axios.get(
        "http://localhost:8000/assign/projects/assigned",
        {
          // Assuming you have the token available in localStorage
          headers: {
            Authorization: token,
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  // Inside handleCreateSubmit function
  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    // Find the selected project based on its name
    console.log(projects);
    console.log(createProject);
    const selectedProject = projects.find(
      (project) => project.projectName === createProject
    );

    if (!selectedProject) {
      console.error("Selected project not found");
      return; // Stop execution if project is not found
    }

    const formData = {
      projectName: createProject, // Use the project name
      progress: createProgress,
      budgetused: createBudgetused,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/projectss/create",
        formData
      );
      console.log("Project update created successfully:", response.data);
      // Show success notification
      toast({
        title: "Project update created",
        description: "The project update was created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reset form fields
      setCreateProject("");
      setCreateProgress("");
      setCreateBudgetused("");
    } catch (error) {
      console.error("Error creating project update:", error.message);
      // You can show an error message to the user here
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    // Find the selected project based on its name
    console.log(projects);
    console.log(createProject);
    const selectedProject = projects.find(
      (project) => project.projectName === updateProject
    );

    if (!selectedProject) {
      console.error("Selected project not found");
      return; // Stop execution if project is not found
    }

    const formData = {
      projectName: updateProject, // Use the project name
      progress: updateProgress,
      budgetused: updateBudgetused,
    };


    try {
      const response = await axios.put(
        `http://localhost:8000/projectss/${selectedProject.id}/update`,
        formData
      );
      console.log("Project update updated successfully:", response.data);
      // Show success notification
      toast({
        title: "Project update updated",
        description: "The project update was updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reset form fields
      setUpdateProject("");
      setUpdateProgress("");
      setUpdateBudgetused("");
    } catch (error) {
      console.error("Error updating project update:", error.message);
      // You can show an error message to the user here
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" mt="4">
      <Box mb="4">
        <Heading as="h2" size="md">
          Create Project Update
        </Heading>
        <form onSubmit={handleCreateSubmit}>
          <FormControl id="createProject" mb="4">
            <FormLabel>Project Name:</FormLabel>
            <Select
              value={createProject}
              onChange={(e) => setCreateProject(e.target.value)} // Set the project name directly
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.projectName}>
                  {" "}
                  {/* Set value to projectName */}
                  {project.projectName}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="createProgress" mb="4">
            <FormLabel>Progress:</FormLabel>
            <Input
              type="number"
              value={createProgress}
              onChange={(e) => setCreateProgress(e.target.value)}
              required
            />
          </FormControl>

          <FormControl id="createBudgetused" mb="4">
            <FormLabel>Budget Used:</FormLabel>
            <Input
              type="number"
              value={createBudgetused}
              onChange={(e) => setCreateBudgetused(e.target.value)}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Create Project Update
          </Button>
        </form>
      </Box>

      <Box mb="4">
        <Heading as="h2" size="md">
          Update Project Update
        </Heading>
        <form onSubmit={handleUpdateSubmit}>
          <FormControl id="updateProject" mb="4">
            <FormLabel>Project Name:</FormLabel>
            <Select
    value={updateProject}
    onChange={(e) => setUpdateProject(e.target.value)} // Set the project name directly
    required
  >
    <option value="">Select Project</option>
    {projects.map((project) => (
      <option key={project.id} value={project.projectName}>
        {project.projectName}
      </option>
    ))}
  </Select>
          </FormControl>

          <FormControl id="updateProgress" mb="4">
            <FormLabel>Progress:</FormLabel>
            <Input
              type="number"
              value={updateProgress}
              onChange={(e) => setUpdateProgress(e.target.value)}
              required
            />
          </FormControl>

          <FormControl id="updateBudgetused" mb="4">
            <FormLabel>Budget Used:</FormLabel>
            <Input
              type="number"
              value={updateBudgetused}
              onChange={(e) => setUpdateBudgetused(e.target.value)}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="green">
            Update Project Update
          </Button>
        </form>
      </Box>
    </Box>
  );
}
