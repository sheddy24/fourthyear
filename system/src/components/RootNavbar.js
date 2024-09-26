import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const RootNavbar = ({ children }) => {
  return (
    <Box mt={0} bgColor={"gray.200"} p={4}>
      <Flex alignItems="center">
        {children}
      </Flex>
    </Box>
  );
};

export default RootNavbar;
