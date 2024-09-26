import React, { useState, useEffect } from "react";
import { getWorkerDetails } from "../auth"; // Importing auth function for getting worker details
import axios from "axios";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";


export default function WorkerHelp() {
  const [workerData, setWorkerData] = useState(null);
  const wtoken = getWorkerDetails(); // Get token containing worker details
  const [issueDescription, setIssueDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch worker data when component mounts
    const fetchWorkerData = async () => {
      try
      {
        const response = await fetch(
          "http://localhost:8000/profile/worker",
          {
            headers: {
              Authorization: wtoken,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setWorkerData(data);
        } else {
          throw new Error("Failed to fetch worker details");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchWorkerData();
  }, [wtoken]);

  const handleIssueDescriptionChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend to create a new notification
      const response = await axios.post(
        "http://localhost:8000/issues/worker/notification",
        {
          description: issueDescription,
          name: workerData.fname, // Send worker's name
          email: workerData.email
        }
      );
  
      if (response.status === 201) {
        // Notification created successfully
        setSuccessMessage('Notification created successfully');
        setIssueDescription(''); // Reset description field
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Clear success message after 3 seconds
      }
    } catch (error) {
      console.error('Error creating notification:', error);
      // Handle error
    }
  };

  return (
    <Box maxW="600px" m="auto" p="20px">
      {workerData ? (
        <Box>
          <Heading mb="20px">Worker Details</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb="20px">
              <FormLabel>First Name:</FormLabel>
              <Input
                type="text"
                value={workerData.fname}
                readOnly
              />
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                value={workerData.email}
                readOnly
              />
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Description:</FormLabel>
              <Textarea
                value={issueDescription}
                onChange={handleIssueDescriptionChange}
                placeholder="Describe your issue..."
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">Submit</Button>
          </form>
          {successMessage && (
            <Alert status="success" mt="4">
              <AlertIcon />
              {successMessage}
            </Alert>
          )}
        </Box>
      ) : (
        <p>Loading worker details...</p>
      )}
    </Box>
  );
}
