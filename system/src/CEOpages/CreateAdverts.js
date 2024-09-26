import { AddIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Button,
  Select,
  Alert,
} from "@chakra-ui/react";
import React from "react";
import { Form } from "react-router-dom";
import { useFormik } from "formik";
import { validation } from "../schemas/advertValidation";
import axios from "axios";

function CreateAdverts() {
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
      role: "",
      description: "",
      requirements: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      axios
        .post("http://localhost:8000/adverts/create-advert", values)
        .then((response) => {
          console.log(
            "Advertisement created successfully:",
            response.data.advert
          );
          // Do something with the created advert, if needed
          resetForm();
        })
        .catch((error) => {
          console.error("Error creating advertisement:", error);
          // Handle errors, if any
        });
    },
  });
  return (
    <Box>
      <Box maxWidth={"500px"} margin={"auto"}>
        <Form onSubmit={handleSubmit}>
          <FormControl isRequired mb="20px">
            <FormLabel color="blue">Select role</FormLabel>
            <Select
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select role</option>
              <option value="project-manager"> project-manager</option>
              <option value="site-supervisor"> site-supervisor</option>
              <option value="onsite-worker"> onsite-worker</option>
            </Select>
          </FormControl>
          {errors.role && touched.role && (
            <Alert status="error">{errors.role}</Alert>
          )}

          <FormControl mb={"10px"} isRequired>
            <FormLabel color={"blue"}>description</FormLabel>
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>
          {errors.description && touched.description && (
            <Alert status="error">{errors.description}</Alert>
          )}

          <FormControl mb={"10px"} isRequired>
            <FormLabel color={"blue"}>requirements</FormLabel>
            <Textarea
              name="requirements"
              value={values.requirements}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>
          {errors.requirements && touched.requirements && (
            <Alert status="error">{errors.requirements}</Alert>
          )}

          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            mb={"10px"}
            type="submit"
          >
            CREATE
          </Button>
        </Form>
      </Box>
    </Box>
  );
}

export default CreateAdverts;
