import React, { useState } from 'react';
import { Box, Heading, Flex, Radio, RadioGroup, Button, Alert, AlertIcon } from "@chakra-ui/react";
import axios from 'axios';
import { getWorkerDetails } from "../auth";

export default function MarkRegister() {
  const [attendanceStatus, setAttendanceStatus] = useState('present');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAttendanceMarking = async () => {
    try {
      const wtoken = getWorkerDetails();
      const requestBody = {
        attendanceStatus: attendanceStatus
      };

      const response = await axios.post('http://localhost:8000/register/mark-attendance', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': wtoken
        }
      });

      console.log("Attendance marked successfully");
    } catch (error) {
      console.error('Error marking attendance:', error);
      setErrorMessage("Error marking attendance. Please try again later.");
      // Clear error message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="50px" p="20px" borderWidth="1px" borderRadius="lg" boxShadow="md" bg="gray.100">
      <Heading as="h2" fontSize="24px" mb="20px" textAlign="center">Mark Attendance</Heading>
      {errorMessage && (
        <Alert status="error" mb="20px">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <Flex align="center" justify="space-between" mb="20px">
        <RadioGroup value={attendanceStatus} onChange={setAttendanceStatus}>
          <Flex direction="column">
            <Radio value="present">Present</Radio>
            <Radio value="absent">Absent</Radio>
          </Flex>
        </RadioGroup>
        <Button colorScheme="blue" onClick={handleAttendanceMarking}>Mark Attendance</Button>
      </Flex>
    </Box>
  );
}
