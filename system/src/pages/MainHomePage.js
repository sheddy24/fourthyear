import { Flex, Heading, Box, HStack, Spacer, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MainHomePage() {
  return (
    <div>
      <Flex
        as="header"
        py="5px"
        px="25px"
        m="4px"
        alignItems="center"
        bg="blue.500"
        color="white"
        borderRadius="10px"
      >
        <HStack spacing="20px">
          <Box bg="white">
            <Image
              boxSize="50px"
              borderRadius={"50%"}
              src="https://img.freepik.com/free-vector/flat-design-construction-company-logo_23-2150051906.jpg?size=626&ext=jpg&ga=GA1.1.1860668642.1707247523&semt=ais"
            />
          </Box>
          <Heading fontSize={"12px"}>Smart works limited</Heading>
        </HStack>
        <Spacer />
        <HStack spacing="20px">
          <Box
            bg="whiteAlpha.900"
            py="5px"
            px="25px"
            fontWeight="bold"
            fontSize="12px"
            borderRadius="15px"
            color="black"
          >
            <Link to="about">about</Link>
          </Box>
          <Box
            bg="whiteAlpha.900"
            py="5px"
            px="25px"
            fontWeight="bold"
            fontSize="12px"
            borderRadius="15px"
            color="black"
          >
            <Link to="advertisements">adverts</Link>
          </Box>

          <Box
            bg="whiteAlpha.900"
            py="5px"
            px="25px"
            fontWeight="bold"
            fontSize="12px"
            borderRadius="15px"
            color="black"
          >
            <Link to="create-account">create account</Link>
          </Box>
        </HStack>
      </Flex>
      <Flex
        as="nav"
        justifyContent="space-around"
        border="1px solid blue"
        m="4px"
        h="100px"
        borderRadius="10px"
      >
        <HStack gap="20px">
          <Box
            py="15px"
            px="30px"
            bg="blue"
            fontSize="12px"
            fontWeight="bold"
            borderRadius="10px"
          >
            <Link to="ceologin">login ceo</Link>
          </Box>
          <Box
            py="15px"
            px="30px"
            bg="blue"
            fontSize="12px"
            fontWeight="bold"
            borderRadius="10px"
          >
            <Link to="projectmanager">manager login</Link>
          </Box>
          <Box
            py="15px"
            px="30px"
            bg="blue"
            fontSize="12px"
            fontWeight="bold"
            borderRadius="10px"
          >
            <Link to="site supervisor">supervisor login</Link>
          </Box>
          <Box
            py="15px"
            px="30px"
            bg="blue"
            fontSize="12px"
            fontWeight="bold"
            borderRadius="10px"
          >
            <Link to="onsite workers">onsite workers login</Link>
          </Box>
        </HStack>
      </Flex>
      <Flex>
        <HStack gap="100px">
          <Heading as="h3" color="blue" marginLeft="50px" fontSize="20px">
            you have made
            <Box as="br" />
            the right choice
          </Heading>
          <Image
            src="https://img.freepik.com/free-vector/building-construction-site-white-background_1308-104802.jpg?size=626&ext=jpg&ga=GA1.1.1860668642.1707247523&semt=ais"
            borderRadius="50%"
            boxShadow="x1"
          />
        </HStack>
      </Flex>
      <Box
        as="footer"
        h="100px"
        bg="blue.500"
        textAlign="center"
        m="4px"
        borderRadius="10px"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="14px"
        fontWeight="bold"
      >
        © 2024 Smart Works Limited. All rights reserved.
      </Box>
    </div>
  );
}

export default MainHomePage;
