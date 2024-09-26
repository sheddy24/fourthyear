import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Box, Flex, Text, VStack, Spacer, Center, Avatar } from '@chakra-ui/react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch recent notifications from backend when component mounts
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/issues/notifications');
        if (response.status === 200) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Handle error
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Box maxW="800px" m="auto" p="20px">
      <Heading mb="20px">View Recent Notifications</Heading>
      <VStack spacing="4">
        {notifications.map((notification) => (
          <Box
            key={notification.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bgColor="white"
            w="100%"
          >
            <Flex p="4" align="center">
              <Spacer />
              <Text fontSize="lg" fontWeight="bold">{notification.name}</Text>
            </Flex>
            <Box p="4">
              <Text fontSize="md"><strong>Email:</strong> {notification.email}</Text>
              <Text mt="2" fontSize="md"><strong>Description:</strong> {notification.description}</Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Notifications;
