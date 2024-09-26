import React, { useState } from "react";
import {  Navigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Select,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { validation } from "../schemas/validation";
import axios from "axios";

const CreateAccount = () => {
  const [accountCreation, setAccountCreation] = useState({ isCreated: false, role: '' });

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
      fname: "",
      lname: "",
      email: "",
      username: "",
      password: "",
      cpassword: "",
      role: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        // Make HTTP POST request to backend
        const response = await axios.post(
          "http://localhost:8000/users/create-account",
          values
        );
        console.log(response.data); // Log response
        setAccountCreation({ isCreated: true, role: values.role });
        resetForm(); // Reset form fields
      } catch (error) {
        console.error("Error creating account:", error);
        // Handle error, show error message to user, etc.
      }
    },
  });



  // If account is created successfully, redirect to user page
  if (accountCreation.isCreated) {
    switch (accountCreation.role) {
      case "project-manager":
        return <Navigate to="/projectmanager" />;
      case "site-supervisor":
        return <Navigate to="/site supervisor" />;
      case "onsite-worker":
        return <Navigate to="/onsite workers" />;
      case "inventory-manager":
        return <Navigate to="/inventorymanager" />;
      default:
        return <Navigate to="/" />; 
    }
  }
 
  return (
    <Box
      bgImage="https://img.freepik.com/premium-vector/abstract-background_936206-1875.jpg?size=626&ext=jpg&ga=GA1.2.1860668642.1707247523&semt=ais"
      bgSize="cover"
      minHeight="100vh"
    >
      <Box
        maxWidth="600px"
        p="40px"
        m="auto"
        bg="white"
        borderRadius="lg"
        boxShadow="md"
      >
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <FormControl isRequired mb="20px">
            <FormLabel color="blue">Enter your first name</FormLabel>
            <Input
              type="text"
              name="fname"
              value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fname && touched.fname && (
              <Alert status="error">{errors.fname}</Alert>
            )}
          </FormControl>

          {/* Last Name */}
          <FormControl isRequired mb="20px">
            <FormLabel color="blue">Enter your last name</FormLabel>
            <Input
              type="text"
              name="lname"
              value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lname && touched.lname && (
              <Alert status="error">{errors.lname}</Alert>
            )}
          </FormControl>

          {/* Email */}
          <FormControl isRequired mb="20px">
            <FormLabel color="blue">Enter your email</FormLabel>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <Alert status="error">{errors.email}</Alert>
            )}
          </FormControl>

          {/* Username */}
          <FormControl isRequired mb="20px">
            <FormLabel color="blue">Enter your username</FormLabel>
            <Input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <Alert status="error">{errors.username}</Alert>
            )}
          </FormControl>

          {/* Password */}
          <FormControl isRequired mb="20px">
            <FormLabel color="blue">Enter your password</FormLabel>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <Alert status="error">{errors.password}</Alert>
            )}
          </FormControl>

          {/* Confirm Password */}
          <FormControl isRequired mb="20px">
            <FormLabel color="blue">Confirm password</FormLabel>
            <Input
              type="password"
              name="cpassword"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cpassword && touched.cpassword && (
              <Alert status="error">{errors.cpassword}</Alert>
            )}
          </FormControl>

          {/* Select Role */}
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
            {errors.role && touched.role && (
              <Alert status="error">{errors.role}</Alert>
            )}
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="blue">
            Create Account
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateAccount;
