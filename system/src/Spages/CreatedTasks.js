import React, { useState, useEffect } from "react";
import { getToken } from "../auth"; // Import the getToken function from your auth.js file
import {
  Box,
  Button,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa"; // Import the warning icon

export default function CreatedTasks() {
  const [projects, setProjects] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const fetchTasks = async (deadline) => {
    try {
      const { stoken } = getToken();

      if (!stoken) {
        console.error("Supervisor token not found");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/task/supervisor?deadline=${deadline}`,
        {
          headers: {
            Authorization: stoken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFilterDate(today);
  }, []);

  useEffect(() => {
    if (filterDate) {
      fetchTasks(filterDate);
    }
  }, [filterDate]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleMarkAsCompleted = async (taskId) => {
    try {
      const { stoken } = getToken();
      if (!stoken) {
        console.error("Supervisor token not found");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/task/mark-complete/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: stoken,
          },
        }
      );

      if (response.ok) {
        console.log("Task marked as completed:", taskId);
        if (filterDate) {
          fetchTasks(filterDate);
        }
      } else {
        console.error("Failed to mark task as completed:", response.statusText);
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const isTaskPastDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    today.setHours(0, 0, 0, 0); // Set time to start of the day
    deadlineDate.setHours(0, 0, 0, 0); // Set time to start of the day
    return deadlineDate < today;
  };

  return (
    <Box margin="20px">
      <Text as="h1" marginBottom="20px">
        Created Tasks
      </Text>
      <VStack spacing="20px">
        <Box>
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => fetchTasks(filterDate)}
          >
            Filter
          </Button>
        </Box>
        {projects.map((project) => (
          <Box key={project.id} marginBottom="40px">
            <Text as="h2" marginBottom="20px">
              {project.projectName}
            </Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Task Name</Th>
                  <Th>Deadline</Th>
                  <Th>Start Date</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {project.Tasks.map((task) => (
                  <Tr key={task.taskid}>
                    <Td>{task.taskname}</Td>
                    <Td>{formatDate(task.deadline)}</Td>
                    <Td>{task.date ? formatDate(task.date) : "N/A"}</Td>
                    <Td>
                      {task.status}
                      {isTaskPastDeadline(task.deadline) &&
                        task.status === "incomplete" && (
                          <FaExclamationTriangle
                            style={{ marginLeft: "5px", color: "red" }}
                          />
                        )}
                    </Td>
                    <Td>
                      {task.status === "incomplete" && (
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() => handleMarkAsCompleted(task.taskid)}
                        >
                          Mark as Completed
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
