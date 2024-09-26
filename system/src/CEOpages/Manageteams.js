import React, { useState, useEffect } from "react";
import {
  Heading,
  Select,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import axios from "axios"; // Import axios for API requests

const ManageTeams = () => {
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [workerNames, setWorkerNames] = useState([]);

  useEffect(() => {
    // Fetch projects from the API
    axios
      .get("http://localhost:8000/project")
      .then((response) => {
        // Extracting only project names from the response
        const projectNames = response.data.map(
          (project) => project.projectName
        );
        setProjects(projectNames);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

    // Fetch managers from the API
    axios
      .get("http://localhost:8000/users/managers")
      .then((response) => {
        const managerNames = response.data.map((manager) => manager.fname);
        setManagers(managerNames);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });

    // Fetch supervisors from the API
    axios
      .get("http://localhost:8000/users/supervisors")
      .then((response) => {
        const supervisorNames = response.data.map(
          (supervisor) => supervisor.fname
        );
        setSupervisors(supervisorNames);
      })
      .catch((error) => {
        console.error("Error fetching supervisors:", error);
      });

    // Fetch workers' names from the API
    axios
      .get("http://localhost:8000/users/workers")
      .then((response) => {
        // Set worker names with response data
        const workerFnames = response.data.map((worker) => worker.fname);
        setWorkerNames(workerFnames);
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
      });
  }, []);

  const handleAssignProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/assign/assign-project",
        {
          projectName: selectedProject,
          managerName: selectedManager,
          supervisorName: selectedSupervisor,
          workerNames: selectedWorkers,
        }
      );
      console.log(response.data);
      // Handle success message or redirect
      setSelectedProject("");
      setSelectedManager("");
      setSelectedSupervisor("");
      setSelectedWorkers([]);
    } catch (error) {
      console.error("Error assigning project:", error);
      // Handle error message
    }
  };

  return (
    <Box maxW={"500px"} margin={"auto"}>
      <Heading>Assign Projects</Heading>
      <FormControl>
        <FormLabel>Select Project</FormLabel>
        <Select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Select Manager</FormLabel>
        <Select
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
        >
          <option value="">Select Manager</option>
          {managers.map((manager) => (
            <option key={manager} value={manager}>
              {manager}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Select Supervisor</FormLabel>
        <Select
          value={selectedSupervisor}
          onChange={(e) => setSelectedSupervisor(e.target.value)}
        >
          <option value="">Select Supervisor</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor} value={supervisor}>
              {supervisor}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Assign Workers</FormLabel>
        <Stack spacing={2}>
          {workerNames.map((workerName) => (
            <Checkbox
              key={workerName}
              isChecked={selectedWorkers.includes(workerName)}
              onChange={() =>
                setSelectedWorkers(
                  selectedWorkers.includes(workerName)
                    ? selectedWorkers.filter((name) => name !== workerName)
                    : [...selectedWorkers, workerName]
                )
              }
            >
              {workerName}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleAssignProject}>
        Assign Project
      </Button>
    </Box>
  );
};

export default ManageTeams;
