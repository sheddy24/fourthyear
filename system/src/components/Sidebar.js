import { Box, Flex, VStack, Text, HStack, Icon } from "@chakra-ui/react";
import {
  FaHome,
  FaProjectDiagram,
  FaBell,
  FaFileAlt,
  FaCalendarAlt,
  FaUsers,
  FaAd,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

// Define link style
const linkStyle = {
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "5px",
  color: "white", // Set text color to white
};

const Sidebar = () => {
  return (
    <Box margin="20px">
      <Flex justifyContent="center" mt="100px">
        <VStack gap="20px" fontSize="12px" fontWeight="bold">
          <Link to="ceohomepage" style={linkStyle}>
            <HStack>
              <Icon as={FaHome} boxSize={6} color="white" />
              <Text color="white">Dashboard</Text>
            </HStack>
          </Link>
          <Link to="newproject" style={linkStyle}>
            <HStack>
              <Icon as={FaProjectDiagram} boxSize={6} color="white" />
              <Text color="white">Create Project</Text>
            </HStack>
          </Link>
          <Link to="notifications" style={linkStyle}>
            <HStack>
              <Icon as={FaBell} boxSize={6} color="white" />
              <Text color="white">Notifications</Text>
            </HStack>
          </Link>
          <Link to="reports" style={linkStyle}>
            <HStack>
              <Icon as={FaFileAlt} boxSize={6} color="white" />
              <Text color="white">Reports</Text>
            </HStack>
          </Link>
          <Link to="manageteams" style={linkStyle}>
            <HStack>
              <Icon as={FaUsers} boxSize={6} color="white" />
              <Text color="white">Manage Teams</Text>
            </HStack>
          </Link>
          <Link to="create adverts" style={linkStyle}>
            <HStack>
              <Icon as={FaAd} boxSize={6} color="white" />
              <Text color="white">Create Adverts</Text>
            </HStack>
          </Link>
          <Link to="review adverts" style={linkStyle}>
            <HStack>
              <Icon as={FaEye} boxSize={6} color="white" />
              <Text color="white">Review Adverts</Text>
            </HStack>
          </Link>
          <Link to="inventory" style={linkStyle}>
            <HStack>
              <Icon as={FaCalendarAlt} boxSize={6} color="white" />
              <Text color="white">Manage Inventory</Text>
            </HStack>
          </Link>
          <Link to='summaries' style={linkStyle}>summary</Link>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
