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
import { useNavigate } from "react-router-dom";

const CEONavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <Flex alignItems="center" bg="gray.100" py={1} px={2}>
      <Box bg="gray.200" p="5px" borderRadius="50%">
        <Image
          boxSize="30px"
          src="https://img.freepik.com/free-vector/flat-design-construction-company-logo_23-2150051906.jpg?size=626&ext=jpg&ga=GA1.1.1860668642.1707247523&semt=ais"
        />
      </Box>
      <Heading fontSize="14px" ml={2}>
        Welcome CEO
      </Heading>
      <Spacer />
      <HStack spacing={2}>
        {/**<Avatar size="sm" />**/}
        <Button colorScheme="blue" size="xs" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default CEONavbar;
