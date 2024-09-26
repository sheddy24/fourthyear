import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { getManagerDetails } from "../auth";
import { useNavigate } from "react-router-dom";

const Pnavbar = () => {
  const { username } = getManagerDetails();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mtoken");
    localStorage.removeItem("musername");
    navigate("/");
  };
  return (
    <Flex alignItems="center" bg="gray.100" py={1} px={2}>
      {/**this is my company logo */}
      <Box bg="gray.200" p="5px" borderRadius="50%">
        <Image
          boxSize="30px"
          src="https://img.freepik.com/free-vector/flat-design-construction-company-logo_23-2150051906.jpg?size=626&ext=jpg&ga=GA1.1.1860668642.1707247523&semt=ais"
        />
      </Box>
      <Heading fontSize="14px" ml={2} marginLeft={"100px"}>
        Welcome {username}, project manager
      </Heading>
      <Spacer />
      <HStack spacing={2}>
        {/*i want a profile picture here in this avatar chakra component  */}
        <Avatar size="sm" />
        <Button colorScheme="blue" size="xs" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Pnavbar;
