import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getWorkerDetails } from "../auth";
import { Box, Heading, Text, Spinner, Center, Flex, VStack } from "@chakra-ui/react";

export default function ViewAttendance() {
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAttendanceSummary() {
      try {
        const wtoken = getWorkerDetails();
        const response = await axios.get('http://localhost:8000/register/attendance/summary',{
          headers: {
            Authorization: wtoken,
          },
        });
        setAttendanceSummary(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch attendance summary. Please try again later.');
        setLoading(false);
      }
    }

    fetchAttendanceSummary();
  }, []);

  if (loading) {
    return (
      <Center mt="10">
        <Spinner size="lg" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt="10">
        <Text fontSize="xl" color="red.500">Error: {error}</Text>
      </Center>
    );
  }

  if (!attendanceSummary) {
    attendanceSummary = {
      presentDays: 0,
      absentDays: 0,
      approvedDays: 0,
      pendingDays: 0,
      disapprovedDays: 0
    };
  }

  const { presentDays, absentDays, approvedDays, pendingDays, disapprovedDays } = attendanceSummary;
  const dailyRate = 700; // Daily rate in dollars
  const totalPayment = presentDays * dailyRate;

  return (
    <Flex direction="column" align="center" mt="10">
      <Box maxW="500px" p="6" borderWidth="1px" borderRadius="xl" bg="gray.50" boxShadow="md">
        <Heading as="h2" fontSize="2xl" mb="4" color="blue.500">Attendance Summary</Heading>
        <VStack spacing="4" align="start">
          <Text fontSize="lg">Days Present: {presentDays}</Text>
          <Text fontSize="lg">Days Absent: {absentDays}</Text>
          <Text fontSize="lg">Days Approved: {approvedDays}</Text>
          <Text fontSize="lg">Days Pending: {pendingDays}</Text>
          <Text fontSize="lg">Days Disapproved: {disapprovedDays}</Text>
          <Text fontSize="xl" fontWeight="bold" color="green.500">Total Payment: ${totalPayment}</Text>
        </VStack>
      </Box>
    </Flex>
  );
}
