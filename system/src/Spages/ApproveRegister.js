import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from "../auth";
import { Box, Button, Spinner, Text, VStack } from "@chakra-ui/react";

export default function ApproveRegister() {
  const [projectsWithWorkersNeedingApproval, setProjectsWithWorkersNeedingApproval] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch workers needing approval
  const fetchWorkersNeedingApproval = async () => {
    try {
      const { stoken } = getToken();
      const response = await axios.get('http://localhost:8000/register/attendance/approval', {
        headers: {
          Authorization: stoken,
        },
      });

      const projects = response.data.projectsWithWorkersNeedingApproval;
      setProjectsWithWorkersNeedingApproval(projects);
      console.log(projects);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch workers needing approval. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkersNeedingApproval(); // Call fetchWorkersNeedingApproval inside useEffect
  }, []);
  // Handle worker approval
  const handleApprove = async (projectId, workerId) => {
    try {
      const { stoken } = getToken();
      await axios.put(`http://localhost:8000/register/attendance/approval/approve/${projectId}/${workerId}`, {}, {
        headers: {
          Authorization: stoken,
        },
      });
      fetchWorkersNeedingApproval();
    } catch (error) {
      console.error('Failed to approve worker:', error);
    }
  };
  
  
  
  // Handle worker disapproval
  const handleDisapprove = async (projectId, workerId) => {
    try {
      const { stoken } = getToken();
      await axios.put(`http://localhost:8000/register/attendance/approval/disapprove/${projectId}/${workerId}`, {}, {
        headers: {
          Authorization: stoken,
        },
      });
      fetchWorkersNeedingApproval();
    } catch (error) {
      console.error('Failed to disapprove worker:', error);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>Error: {error}</Text>
      </Box>
    );
  }

  // Render worker approval/disapproval buttons
  const renderApprovalButtons = (projectId, workerId) => (
    <VStack spacing={4}>
      <Button colorScheme="green" onClick={() => handleApprove(projectId, workerId)}>Approve</Button>
      <Button colorScheme="red" onClick={() => handleDisapprove(projectId, workerId)}>Disapprove</Button>
    </VStack>
  );

  // Render project and worker list
  return (
    <VStack spacing={6} align="flex-start" mt={6}>
      <Text fontSize="xl" fontWeight="bold">Workers Needing Approval</Text>
      {projectsWithWorkersNeedingApproval.map((project, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="md" w="100%">
          <Text fontSize="lg" fontWeight="bold">Project: {project.projectName}</Text>
          <VStack spacing={2} align="flex-start" mt={4}>
            {project.workers.map((worker, workerIndex) => (
              <Box key={workerIndex} w="100%">
                <Text fontSize="md">Worker: {worker.workerName}</Text>
                <Text fontSize="md">Status: {worker.status}</Text>
                {renderApprovalButtons(project.projectId, worker.workerId)}
              </Box>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}
