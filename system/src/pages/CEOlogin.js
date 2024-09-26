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
import React, { useState } from "react";
import { useFormik } from "formik";
import { loginValidation } from "../schemas/loginValidation";
import { Navigate,Link } from "react-router-dom";
import axios from "axios";

function CEOlogin() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginValidation,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/auth/login/CEO",
            values
          );
          console.log(response.data);
          resetForm();
          setLoggedIn(true);
          setShowSuccess(true);
          setShowError(false);
        } catch (error) {
          console.error("Login failed:", error);
          setShowSuccess(false);
          setShowError(true);
        }
      },
    });

  if (isLoggedIn) {
    return <Navigate to="CEOlayout" />;
  }

  return (
    <Box
      bgImage="https://img.freepik.com/premium-vector/abstract-background_936206-1875.jpg?size=626&ext=jpg&ga=GA1.2.1860668642.1707247523&semt=ais"
      bgSize="cover"
      minHeight="100vh"
    >
      <Box maxW="480px" mx="auto">
        <form onSubmit={handleSubmit}>
          <Heading as="h2" textAlign="center" mb="20px" color="blue">
            CEO LOGIN
          </Heading>
          {showSuccess && (
            <Alert status="success" mb="20px">
              <AlertIcon />
              <AlertTitle>Login successful. Redirecting...</AlertTitle>
            </Alert>
          )}
          {showError && (
            <Alert status="error" mb="20px">
              <AlertIcon />
              <AlertTitle>Login failed. Please check your credentials.</AlertTitle>
            </Alert>
          )}
          <FormControl isRequired mb="40px">
            <FormLabel color="blue">username</FormLabel>
            <Input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errors.username}</AlertTitle>
              </Alert>
            )}
            <FormHelperText color="blue">Enter your username</FormHelperText>
          </FormControl>

          <FormControl isRequired mb="40px">
            <FormLabel color="blue">password</FormLabel>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errors.password}</AlertTitle>
              </Alert>
            )}
            <FormHelperText color="blue">Enter your password</FormHelperText>
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>

          <Link to="/forgotpassword" color="blue" fontSize="14px">
            Forgot Password?
          </Link>
        </form>
      </Box>
    </Box>
  );
}

export default CEOlogin;
