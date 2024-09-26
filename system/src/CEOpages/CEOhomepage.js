import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  Text,
  Button,
  Flex,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

const CEOhomepage = () => {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [managers, setManagers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllManagers, setShowAllManagers] = useState(false);
  const [showAllSupervisors, setShowAllSupervisors] = useState(false);
  const [showAllWorkers, setShowAllWorkers] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/project");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const handleEditProject = (project) => {
    setEditProject(project);
    setFormData({
      projectName: project.projectName,
      description: project.description,
      startDate: formatDateForInput(project.startDate),
      endDate: formatDateForInput(project.endDate),
      budget: project.budget,
    });
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    // Ensure month and day are formatted with leading zeros if needed
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  };
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/project/projects/edit/${editProject.id}`, formData);
      // Update the projects state with the edited project
      setProjects(projects.map(p => p.id === editProject.id ? {...p, ...formData} : p));
      // Clear editProject state

      setEditProject(null);
      setFormData({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
      });
    } catch (error) {
      console.error("Error editing project:", error);
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/managers");
        if (!response.ok) {
          throw new Error("Failed to fetch managers");
        }
        const managersData = await response.json();
        setManagers(managersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManagers();
  }, []);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/supervisors");
        if (!response.ok) {
          throw new Error("Failed to fetch supervisors");
        }
        const supervisorsData = await response.json();
        setSupervisors(supervisorsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSupervisors();
  }, []);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/workers");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }
        const workersData = await response.json();
        setWorkers(workersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:8000/project/projects/${projectId}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleDeleteUser = async (userId, role) => {
    try {
      console.log(`Deleting ${role} with ID: ${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box maxWidth="100%" border={"5px"}>
      <Heading marginBottom="8px">Projects</Heading>
<SimpleGrid columns={[1, null, 2]} spacing="8px">
        {projects.map((project) => (
          <Card
            key={project.id}
            borderTop="8px"
            borderColor="blue.500"
            boxShadow="md"
            borderRadius="md"
          >
            <Stack spacing={2} p={4}>
              <CardHeader>
                <Heading size="md" color="blue.800">
                  {project.projectName}
                </Heading>
              </CardHeader>
              <Divider borderColor="blue.500" />
              <CardBody>
                <Text fontWeight="bold">Description</Text>
                <Text color="gray.600">{project.description}</Text>
                <Text fontWeight="bold" mt={2}>
                  Dates
                </Text>
                <Stack direction="row">
                  <Badge colorScheme="blue">Start Date:</Badge>
                  <Text>{formatDate(project.startDate)}</Text>
                </Stack>
                <Stack direction="row">
                  <Badge colorScheme="blue">End Date:</Badge>
                  <Text>{formatDate(project.endDate)}</Text>
                </Stack>
                <Text fontWeight="bold" mt={2}>
                  Budget
                </Text>
                <Text>${project.budget}</Text>
              </CardBody>
              <Divider borderColor={"blue.500"} />
              <CardFooter>
                <Flex justify="space-between">
                  <Button colorScheme="blue" leftIcon={<EditIcon />} onClick={() => handleEditProject(project)}>
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </CardFooter>
              {editProject && editProject.id === project.id && (
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="projectName"
                      placeholder="Project Name"
                      value={formData.projectName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                    <input
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                    <input
                      type="date"
                      name="endDate"
                      placeholder="End Date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      name="budget"
                      placeholder="Budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </CardBody>
              )}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
      {showAllProjects ? (
        <Button onClick={() => setShowAllProjects(false)} mt={4}>
          Show Less Projects
        </Button>
      ) : (
        <Button onClick={() => setShowAllProjects(true)} mt={4}>
          Show More Projects
        </Button>
      )}

      <Heading marginTop="30px">Managers</Heading>
      <SimpleGrid columns={[1, null, 2]} spacing="8px">
        {managers
          .slice(0, showAllManagers ? managers.length : 2)
          .map((manager) => (
            <Card
              key={manager.id}
              borderTop="8px"
              borderColor="blue.500"
              boxShadow="md"
              borderRadius="md"
            >
              <CardHeader>
                <Flex alignItems="center">
                  <Avatar name={`${manager.fname} ${manager.lname}`} mr="2" />
                  <Text fontWeight="bold">{`${manager.fname} ${manager.lname}`}</Text>
                </Flex>
              </CardHeader>
              <Divider />
              <CardBody>
                <Text fontWeight="bold">Email:</Text>
                <Text>{manager.email}</Text>
                <Text fontWeight="bold" mt={2}>
                  Username:
                </Text>
                <Text>{manager.username}</Text>
              </CardBody>
              <Divider />
              <CardFooter>
                <Flex>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    mr="2"
                    onClick={() => handleDeleteUser(manager.id, "manager")}
                  >
                    Delete Account
                  </Button>
                </Flex>
              </CardFooter>
            </Card>
          ))}
      </SimpleGrid>
      {showAllManagers ? (
        <Button onClick={() => setShowAllManagers(false)} mt={4}>
          Show Less Managers
        </Button>
      ) : (
        <Button onClick={() => setShowAllManagers(true)} mt={4}>
          Show More Managers
        </Button>
      )}

      <Heading marginTop="30px">Supervisors</Heading>
      <SimpleGrid columns={[1, null, 2]} spacing="8px">
        {supervisors
          .slice(0, showAllSupervisors ? supervisors.length : 2)
          .map((supervisor) => (
            <Card
              key={supervisor.id}
              borderTop="8px"
              borderColor="blue.500"
              boxShadow="md"
              borderRadius="md"
            >
              <CardHeader>
                <Flex alignItems="center">
                  <Avatar
                    name={`${supervisor.fname} ${supervisor.lname}`}
                    mr="2"
                  />
                  <Text fontWeight="bold">{`${supervisor.fname} ${supervisor.lname}`}</Text>
                </Flex>
              </CardHeader>
              <Divider />
              <CardBody>
                <Text fontWeight="bold">Email:</Text>
                <Text>{supervisor.email}</Text>
                <Text fontWeight="bold" mt={2}>
                  Username:
                </Text>
                <Text>{supervisor.username}</Text>
              </CardBody>
              <Divider />
              <CardFooter>
                <Flex>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    mr="2"
                    onClick={() =>
                      handleDeleteUser(supervisor.id, "supervisor")
                    }
                  >
                    Delete User
                  </Button>
                </Flex>
              </CardFooter>
            </Card>
          ))}
      </SimpleGrid>
      {showAllSupervisors ? (
        <Button onClick={() => setShowAllSupervisors(false)} mt={4}>
          Show Less Supervisors
        </Button>
      ) : (
        <Button onClick={() => setShowAllSupervisors(true)} mt={4}>
          Show More Supervisors
        </Button>
      )}

      <Heading marginTop="30px">Workers</Heading>
      <SimpleGrid columns={[1, null, 2]} spacing="8px">
        {workers.slice(0, showAllWorkers ? workers.length : 2).map((worker) => (
          <Card
            key={worker.id}
            borderTop="8px"
            borderColor="blue.500"
            boxShadow="md"
            borderRadius="md"
          >
            <CardHeader>
              <Flex alignItems="center">
                <Avatar name={`${worker.fname} ${worker.lname}`} mr="2" />
                <Text fontWeight="bold">{`${worker.fname} ${worker.lname}`}</Text>
              </Flex>
            </CardHeader>
            <Divider />
            <CardBody>
              <Text fontWeight="bold">Email:</Text>
              <Text>{worker.email}</Text>
              <Text fontWeight="bold" mt={2}>
                Username:
              </Text>
              <Text>{worker.username}</Text>
            </CardBody>
            <Divider />
            <CardFooter>
              <Flex>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  mr="2"
                  onClick={() => handleDeleteUser(worker.id, "worker")}
                >
                  Delete User
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      {showAllWorkers ? (
        <Button onClick={() => setShowAllWorkers(false)} mt={4}>
          Show Less Workers
        </Button>
      ) : (
        <Button onClick={() => setShowAllWorkers(true)} mt={4}>
          Show More Workers
        </Button>
      )}
    </Box>
  );
};

export default CEOhomepage;
