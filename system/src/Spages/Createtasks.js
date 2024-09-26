import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { getToken } from "../auth";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Select,
} from "@chakra-ui/react";

export default function CreateTasks() {
  const [formData, setFormData] = useState({
    projectid: "", // Initialize project ID to empty string
    date: getCurrentDate(), // Set default date to current date
    taskname: "",
    deadline: getCurrentDate(), // Initialize deadline to current date
  });

  const [projects, setProjects] = useState([]); // State to hold assigned projects

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const fetchAssignedProjects = async () => {
    try {
      // Fetch list of assigned projects
      const { stoken } = getToken();
      const response = await axios.get(
        "http://localhost:8000/assign/superviosr/assigned",
        {
          headers: {
            Authorization: stoken,
          },
        }
      );
      setProjects(response.data); // Set assigned projects in state
    } catch (error) {
      console.error("Error fetching assigned projects:", error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post data to backend API using axios
      const response = await axios.post(
        "http://localhost:8000/task/create-task",
        formData
      );

      console.log("Task created:", response.data);

      // Reset form fields to initial values
      setFormData({
        projectid: "",
        date: getCurrentDate(),
        taskname: "",
        deadline: getCurrentDate(),
      });
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error
    }
  };

  return (
    <Box w="100%" maxW="400px" p="4" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Project</FormLabel>
          <Select
            name="projectid"
            value={formData.projectid}
            onChange={handleChange}
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
        <FormControl mb="4">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getCurrentDate()}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Task Name</FormLabel>
          <Input
            type="text"
            name="taskname"
            value={formData.taskname}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Deadline</FormLabel>
          <Input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={getCurrentDate()}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Create Task
        </Button>
      </form>
    </Box>
  );
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  return `${year}-${month}-${day}`;
}
