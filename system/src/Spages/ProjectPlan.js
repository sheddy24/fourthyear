import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { getToken } from "../auth";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Select,
} from "@chakra-ui/react";

export default function ProjectPlan() {
  const [selectedProject, setSelectedProject] = useState("");
  const [projectDocument, setProjectDocument] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

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

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleRetrieveDocument = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/file/project-plan/${selectedProject}`,
        {
          responseType: "blob",
        }
      );
      setProjectDocument(URL.createObjectURL(response.data));
    } catch (error) {
      console.error("Error fetching project plan:", error);
    }
  };

  return (
    <Box w="100%" maxW="400px" p="4" borderWidth="1px" borderRadius="md">
      <FormControl mb="4">
        <FormLabel>Project</FormLabel>
        <Select
          value={selectedProject}
          onChange={handleProjectChange}
          placeholder="Select project"
          required
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.projectName}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        mb="4"
        colorScheme="blue"
        onClick={handleRetrieveDocument}
        disabled={!selectedProject}
      >
        Retrieve Document
      </Button>
      {projectDocument && (
        <div>
          <embed src={projectDocument} type="application/pdf" width="100%" height="600px" />
          <a href={projectDocument} download>Download Project Plan</a>
        </div>
      )}
    </Box>
  );
}
