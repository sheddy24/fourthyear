import React, { useState, useEffect } from "react";
import axios from "axios";
import { getManagerDetails } from "../auth";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const UploadDocs = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [projectFiles, setProjectFiles] = useState({});
  const toast = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { token } = getManagerDetails();
      const response = await axios.get(
        "http://localhost:8000/assign/projects/assigned",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  const initialValues = {
    project: "",
    projectPlan: null,
    contractAgreement: null,
  };

  const validationSchema = Yup.object().shape({
    project: Yup.string().required("Project is required"),
    projectPlan: Yup.mixed().required("Project plan is required"),
    contractAgreement: Yup.mixed().required("Contract agreement is required"),
  });

  const handleFileChange = (e, props) => {
    const { name, files } = e.target;
    setProjectFiles({
      ...projectFiles,
      [name]: files[0], // Update the file input's value in projectFiles state
    });

    // Manually set the value of the file input in Formik's form state
    props.setFieldValue(name, files[0]);
  };

  const onSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("projectId", selectedProject); // Send the selected project ID
      formData.append("projectPlan", projectFiles.projectPlan);
      formData.append("contractAgreement", projectFiles.contractAgreement);

      await fetch("http://localhost:8000/file/upload", {
        method: "POST",
        body: formData,
      });

      toast({
        title: "Documents uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      actions.resetForm();
    } catch (error) {
      console.error("Error uploading documents:", error);

      toast({
        title: "An error occurred",
        description: "Failed to upload documents",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={6}>
        Upload Project Documents
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Field name="project">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel htmlFor="project">Select Project</FormLabel>
                  <Select
                    {...field}
                    id="project"
                    placeholder="Select Project"
                    onChange={(e) => {
                      const selectedProject = projects.find(
                        (project) => project.projectName === e.target.value
                      );
                      const projectId = selectedProject ? selectedProject.id : "";
                      setSelectedProject(projectId); // Store the ID of the selected project
                      field.onChange(e);
                    }}
                  >
                    {projects.map((project) => (
                      <option key={project.id} value={project.projectName}>
                        {project.projectName}
                      </option>
                    ))}
                  </Select>
                  <ErrorMessage name="project" />
                </FormControl>
              )}
            </Field>
            <Field name="projectPlan">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel htmlFor="projectPlan">Project Plan</FormLabel>
                  <Input
                    type="file"
                    id="projectPlan"
                    name="projectPlan"
                    onChange={(e) => handleFileChange(e, props)}
                  />
                  <ErrorMessage name="projectPlan" />
                </FormControl>
              )}
            </Field>
            <Field name="contractAgreement">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel htmlFor="contractAgreement">
                    Contract Agreement
                  </FormLabel>
                  <Input
                    type="file"
                    id="contractAgreement"
                    name="contractAgreement"
                    onChange={(e) => handleFileChange(e, props)}
                  />
                  <ErrorMessage name="contractAgreement" />
                </FormControl>
              )}
            </Field>
            <Button
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Upload
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UploadDocs;
