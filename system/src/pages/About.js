import { Box, Heading, Text, HStack, Link, Icon } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <Box p="6" bg="blue.50" borderRadius="lg" boxShadow="lg">
    <Heading as="h1" size="xl" mb="4" color="blue.800">
      About Smart Works Construction Company
    </Heading>
    <Text fontSize="lg" mb="4" color="blue.700">
      Smart Works Construction Company is a leading construction firm dedicated
      to delivering high-quality construction projects across various sectors.
      With a team of experienced professionals and a commitment to excellence,
      we strive to exceed our clients' expectations on every project.
    </Text>
    <Text fontSize="lg" mb="4" color="blue.700">
      Our services include but are not limited to:
    </Text>
    <Box as="ul" pl="4" color="blue.700">
      <li>
        <Text fontSize="lg">Residential construction</Text>
      </li>
      <li>
        <Text fontSize="lg">Commercial construction</Text>
      </li>
      <li>
        <Text fontSize="lg">Industrial construction</Text>
      </li>
      <li>
        <Text fontSize="lg">Renovation and remodeling</Text>
      </li>
      <li>
        <Text fontSize="lg">Project management</Text>
      </li>
    </Box>
    <Text fontSize="lg" mt="4" color="blue.700">
      Contact us today to learn more about how we can assist with your next
      construction project.
    </Text>
    <Text fontSize="lg" mt="4" color="blue.700">
      Follow us on social media:
    </Text>
    <HStack spacing="4" mt="2">
      <Link href="https://www.facebook.com/profile.php?id=61556439767751" isExternal>
        <Icon as={FaFacebook} boxSize={8} color="blue.500" />
      </Link>
      <Link href="#" isExternal>
        <Icon as={FaTwitter} boxSize={8} color="blue.400" />
      </Link>
      <Link href="#" isExternal>
        <Icon as={FaInstagram} boxSize={8} color="blue.400" />
      </Link>
      <Link href="#" isExternal>
        <Icon as={FaLinkedin} boxSize={8} color="blue.500" />
      </Link>
    </HStack>
  </Box>
);
  
}

export default About
