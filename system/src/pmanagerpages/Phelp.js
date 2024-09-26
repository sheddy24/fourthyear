import React, { useState, useEffect } from "react";
import { getManagerDetails } from "../auth"; // Importing auth function for getting manager details
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


export default function Phelp() {
  const [managerData, setManagerData] = useState(null);
  const { token } = getManagerDetails(); // Get token containing manager details
  const [issueDescription, setIssueDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch manager data when component mounts
    const fetchManagerData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/profile/manager",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setManagerData(data);
        } else {
          throw new Error("Failed to fetch manager details");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchManagerData();
  }, [token]);

  const handleIssueDescriptionChange = (e) => {
    setIssueDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend to create a new notification
      const response = await axios.post(
        "http://localhost:8000/issues/manager/notification",
        {
          description: issueDescription,
          name: managerData.fname, // Send manager's name
          email: managerData.email
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
      {managerData ? (
        <Box>
          <Heading mb="20px">Manager Details</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb="20px">
              <FormLabel>First Name:</FormLabel>
              <Input
                type="text"
                value={managerData.fname}
                readOnly
              />
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                value={managerData.email}
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
        <p>Loading manager details...</p>
      )}
    </Box>
  );
}
