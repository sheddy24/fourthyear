import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Adverts = () => {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/adverts");
        setAdverts(response.data.adverts);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        // Handle error
      }
    };

    fetchAdverts();
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      <Heading mb="4" textAlign="center" color="blue.800">
        Adverts
      </Heading>
      {adverts.map((advert) => (
        <Card
          key={advert.id} // Add a unique key to each card
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p="4"
          mb="4"
        >
          <CardHeader>
            <Text fontWeight="bold" color="blue.800">
              {`Advertisement for the position of ${advert.role}`}
            </Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text fontWeight="bold" mb="2">
              Description
            </Text>
            <Text color="gray.600">{advert.description}</Text>
            <Text fontWeight="bold" mt="4" mb="2">
              Requirements
            </Text>
            <Text color="gray.600">{advert.requirements}</Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <Text>
              Send your CV via{" "}
              <a href="mailto:smartworks@gmail.com" style={{ color: "blue" }}>
                smartworks@gmail.com
              </a>{" "}
              - All the best!
            </Text>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default Adverts;
