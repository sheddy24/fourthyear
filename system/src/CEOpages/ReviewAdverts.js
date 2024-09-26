import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function ReviewAdverts() {
  const [adverts, setAdverts] = useState([]);
  const [editAdvert, setEditAdvert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    description: "",
    requirements: "",
  });

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

  const handleEditAdvert = (advert) => {
    setEditAdvert(advert);
    setFormData({
      role: advert.role,
      description: advert.description,
      requirements: advert.requirements,
    });
    setShowModal(true);
  };

  const handleDeleteAdvert = async (advertId) => {
    try {
      await axios.delete(`http://localhost:8000/adverts/${advertId}`);
      setAdverts(adverts.filter((advert) => advert.id !== advertId));
    } catch (error) {
      console.error("Error deleting advertisement:", error);
      // Handle error
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8000/adverts/${editAdvert.id}`, formData);
      // Refresh adverts after editing
      const response = await axios.get("http://localhost:8000/adverts");
      setAdverts(response.data.adverts);
      setShowModal(false);
    } catch (error) {
      console.error("Error editing advertisement:", error);
      // Handle error
    }
  };

  return (
    <>
      <Heading>Adverts</Heading>
      {adverts.map((advert) => (
        <Card
          key={advert.id}
          mt={"20px"}
          borderTop={"8px solid blue"}
          boxShadow={"2xl"}
        >
          <CardHeader>
            <Text fontWeight={"bold"}>
              {`Advertisement for the position of ${advert.role}`}
            </Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text fontWeight={"bold"}>Description</Text>
            {advert.description}
            <Text fontWeight={"bold"}>Requirements</Text>
            {advert.requirements}
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              leftIcon={<DeleteIcon />}
              mr={"50px"}
              colorScheme="red"
              onClick={() => handleDeleteAdvert(advert.id)}
            >
              DELETE
            </Button>
            <Button
              leftIcon={<EditIcon />}
              colorScheme="blue"
              onClick={() => handleEditAdvert(advert)}
            >
              EDIT
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Advertisement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Requirements</FormLabel>
              <Input
                type="text"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReviewAdverts;
