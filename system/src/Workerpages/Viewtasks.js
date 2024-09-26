import { Heading, Box, Text, Divider, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getWorkerDetails } from "../auth";

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const wtoken = getWorkerDetails();
        console.log(wtoken);
        const response = await axios.get('http://localhost:8000/task/worker',{
          headers: {
            Authorization: wtoken,
          },
        });
        setTasks(response.data);
        console.log(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Box p="4">
      <Heading mb="4">Tasks for the Project</Heading>
      <Divider mb="4" />
      <VStack align="start" spacing="4">
        {tasks.map(task => (
          <Box key={task.taskid} p="4" borderWidth="1px" borderRadius="lg" width="100%">
            <Heading as="h3" size="md" mb="2">{task.taskname}</Heading>
            <Text>{task.description}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
