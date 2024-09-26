import React, { useState, useEffect } from "react";
import { getToken } from "../auth"; // Importing auth function for getting supervisor details
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


export default function Shelp() {
  const [supervisorData, setSupervisorData] = useState(null);
  const { stoken } = getToken(); // Get token containing supervisor details
  const [issueDescription, setIssueDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch supervisor data when component mounts
    const fetchSupervisorData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/profile/supervisor",
          {
            headers: {
              Authorization: stoken,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSupervisorData(data);
        } else {
          throw new Error("Failed to fetch supervisor details");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchSupervisorData();
  }, [stoken]);

  const handleIssueDescriptionChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend to create a new notification
      const response = await axios.post(
        "http://localhost:8000/issues/supervisor/notification",
        {
          description: issueDescription,
          name: supervisorData.fname, // Send supervisor's name
          email: supervisorData.email
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
      {supervisorData ? (
        <Box>
          <Heading mb="20px">Supervisor Details</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb="20px">
              <FormLabel>First Name:</FormLabel>
              <Input
                type="text"
                value={supervisorData.fname}
                readOnly
              />
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                value={supervisorData.email}
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
        <p>Loading supervisor details...</p>
      )}
    </Box>
  );
}
