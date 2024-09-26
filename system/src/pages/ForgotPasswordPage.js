import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for form validation
import axios from "axios"; // Import axios for making HTTP requests

const ForgotPasswordPage = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting // Add isSubmitting for showing loading state
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Make HTTP POST request to your reset password API endpoint
        await axios.post("http://localhost:8000/reset-password", values);
        // Handle success (e.g., show success message to user)
        console.log("Password reset email sent successfully");
      } catch (error) {
        // Handle error (e.g., show error message to user)
        console.error("Error sending password reset email:", error);
      }
    },
  });

  return (
    <Box
      bgImage="https://img.freepik.com/premium-vector/abstract-background_936206-1875.jpg?size=626&ext=jpg&ga=GA1.2.1860668642.1707247523&semt=ais"
      bgSize="cover"
      minHeight="100vh"
      p="40px"
    >
      <Box maxW="480px" mx="auto">
        <Heading as="h2" color="blue" mb="20px">
          Forgot Password
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb="40px">
            <FormLabel color="blue" fontSize="14px">
              Email:
            </FormLabel>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <Alert status="error" mt="2">
                <AlertIcon />
                <AlertTitle>{errors.email}</AlertTitle>
              </Alert>
            )}
            <FormHelperText color="blue" fontSize="14px">
              Enter your email address
            </FormHelperText>
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
