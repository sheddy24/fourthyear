import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { Form } from "react-router-dom";
import { projectValidation } from "../schemas/projectvalidation";
import axios from "axios";

const Newproject = () => {
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");

  const handleStartDateChange = (e) => {
    setTempStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setTempEndDate(e.target.value);
  };

  const handleStartDateBlur = () => {
    handleChange({
      target: {
        name: "startDate",
        value: tempStartDate,
      },
    });
  };

  const handleEndDateBlur = () => {
    handleChange({
      target: {
        name: "endDate",
        value: tempEndDate,
      },
    });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
      budget: "",
      status: "",
    },
    validationSchema: projectValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/project/create-project",
          values
        );
        console.log(response.data);
        handleFormReset();
      } catch (error) {
        console.error("not created", error);
      }
    },
  });

  const handleFormReset = () => {
    resetForm({
      values: {
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
        status: "",
      },
    });
  };

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <Box
      maxW="500px"
      mx="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      p="30px"
    >
      <Form onSubmit={handleSubmit}>
        <FormControl mb="20px">
          <FormLabel color="blue.400">Project Name</FormLabel>
          <Input
            type="text"
            name="projectName"
            value={values.projectName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter project name"
          />
          {errors.projectName && touched.projectName && (
            <Alert status="error" mt="2">
              <AlertIcon />
              <AlertTitle>{errors.projectName}</AlertTitle>
            </Alert>
          )}
        </FormControl>

        <FormControl mb="20px">
          <FormLabel color="blue.400">Description</FormLabel>
          <Textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter project description"
            resize="none"
          />
          {errors.description && touched.description && (
            <Alert status="error" mt="2">
              <AlertIcon />
              <AlertTitle>{errors.description}</AlertTitle>
            </Alert>
          )}
        </FormControl>

        <FormControl mb="20px">
          <FormLabel color="blue.400">Start Date</FormLabel>
          <Input
            type="date"
            name="startdate"
            value={tempStartDate}
            onChange={handleStartDateChange}
            onBlur={handleStartDateBlur}
            min={getCurrentDate()} // Set the minimum date to the current date
          />
          {errors.startDate && touched.startDate && (
            <Alert status="error" mt="2">
              <AlertIcon />
              <AlertTitle>{errors.startDate}</AlertTitle>
            </Alert>
          )}
        </FormControl>

        <FormControl mb="20px">
          <FormLabel color="blue.400">End Date</FormLabel>
          <Input
            type="date"
            name="enddate"
            value={tempEndDate}
            onChange={handleEndDateChange}
            onBlur={handleEndDateBlur}
            min={tempStartDate || getCurrentDate()} // Set the minimum date to either the start date or the current date
          />
          {errors.endDate && touched.endDate && (
            <Alert status="error" mt="2">
              <AlertIcon />
              <AlertTitle>{errors.endDate}</AlertTitle>
            </Alert>
          )}
        </FormControl>

        <FormControl mb="20px">
          <FormLabel color="blue.400">Budget</FormLabel>
          <Input
            type="number"
            name="budget"
            value={values.budget}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter project budget"
          />
          {errors.budget && touched.budget && (
            <Alert status="error" mt="2">
              <AlertIcon />
              <AlertTitle>{errors.budget}</AlertTitle>
            </Alert>
          )}
        </FormControl>

        <FormControl mb="20px">
          <FormLabel color="blue.400">Select Status</FormLabel>
          <Select
            name="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Select project status"
          >
            <option value="">Select status</option>
            <option value="initiated">Initiated</option>
            <option value="inprogress">In Progress</option>
          </Select>
          {errors.status && touched.status && (
            <Alert status="error" mt="2">
              <AlertIcon />
              <AlertTitle>{errors.status}</AlertTitle>
            </Alert>
          )}
        </FormControl>

        <Button type="submit" colorScheme="blue" mt="4">
          Create Project
        </Button>
      </Form>
    </Box>
  );
};

export default Newproject;
