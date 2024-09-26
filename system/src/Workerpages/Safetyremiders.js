import { Heading, Box, Text, Divider, VStack } from '@chakra-ui/react';
import React from 'react';

export default function SafetyReminders() {
  // Dummy safety reminders for demonstration
  const safetyReminders = [
    'Always wear appropriate PPE (Personal Protective Equipment) on site.',
    'Follow safety protocols and procedures at all times.',
    'Attend mandatory safety training sessions.',
    'Report any hazards or incidents to your supervisor immediately.',
  ];

  // Dummy emergency contacts for demonstration
  const emergencyContacts = [
    { name: 'John Doe', role: 'Safety Officer', phone: '123-456-7890' },
    { name: 'Jane Smith', role: 'Site Manager', phone: '987-654-3210' },
    { name: 'Emergency Services', role: '911', phone: '911' },
  ];

  return (
    <Box p="4">
      <Heading mb="4">Safety Reminders & Emergency Contacts</Heading>
      <Divider mb="4" />
      <VStack align="start" spacing="4">
        {/* Display safety reminders */}
        {safetyReminders.map((reminder, index) => (
          <Box key={index} p="2" borderWidth="1px" borderRadius="lg" width="100%">
            <Text>{reminder}</Text>
          </Box>
        ))}
        {/* Display emergency contacts */}
        <Box p="2" borderWidth="1px" borderRadius="lg" width="100%">
          <Heading as="h4" size="sm" mb="2">Emergency Contacts</Heading>
          {emergencyContacts.map((contact, index) => (
            <Text key={index}>
              <strong>{contact.name}</strong> - {contact.role}: {contact.phone}
            </Text>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}
