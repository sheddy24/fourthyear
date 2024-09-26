import { Box, Flex, VStack } from "@chakra-ui/react";
import {
  FaUser,
  FaHome,
  FaChartBar,
  FaListAlt,
  FaBell,
  FaFileUpload,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Psidebar = () => {
  return (
    <Box margin="20px">
      <Flex justifyContent="center" mt="100px">
        <VStack gap="20px" fontSize="14px" fontWeight="bold">
          <Link to="profile" style={linkStyle}>
            <FaUser style={iconStyle} /> Profile
          </Link>
          <Link to="userhomepage" style={linkStyle}>
            <FaHome style={iconStyle} /> Home
          </Link>
          <Link to="pdashboard" style={linkStyle}>
            <FaChartBar style={iconStyle} /> Dashboard
          </Link>
          <Link to="projectoverview" style={linkStyle}>
            <FaListAlt style={iconStyle} /> Project Overview
          </Link>
          <Link to="projectupdates" style={linkStyle}>
            <FaBell style={iconStyle} /> Project Updates
          </Link>
          <Link to="uploadprojectdocs" style={linkStyle}>
            <FaFileUpload style={iconStyle} /> Project Documents
          </Link>

          <Link to="help">help</Link>
        </VStack>
      </Flex>
    </Box>
  );
};

// Styles
const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "background-color 0.3s, color 0.3s",
};

const iconStyle = {
  fontSize: "20px",
};

export default Psidebar;
