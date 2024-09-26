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
import { Form, Navigate, Link } from "react-router-dom";
import { loginValidation } from "../schemas/loginValidation";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

const Supervisorlogin = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
      username: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/login/supervisor",
          values
        );
        const { token, username } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setLoginSuccess(true);
        resetForm();
      } catch (error) {
        setLoginError(true);
      }
    },
  });

  if (loginSuccess) {
    return <Navigate to="supervisorlayout" />;
  }

  return (
    <Box
      bgImage="https://img.freepik.com/premium-vector/abstract-background_936206-1875.jpg?size=626&ext=jpg&ga=GA1.2.1860668642.1707247523&semt=ais"
      bgSize="cover"
      minHeight="100vh"
    >
      <Box maxW="480px" mx="auto">
        <Heading as="h2" color="blue" mb="20px">
          LOGIN SITE SUPERVISOR
        </Heading>
        {loginError && (
          <Alert status="error" mb="20px">
            <AlertIcon />
            <AlertTitle>Login unsuccessful. Please check your credentials.</AlertTitle>
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <FormControl isRequired mb="40px">
            <FormLabel color="blue" fontSize="14px">
              Username:
            </FormLabel>
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
            <FormHelperText color="blue" fontSize="14px">
              Enter your username
            </FormHelperText>
          </FormControl>

          <FormControl isRequired mb="40px">
            <FormLabel color="blue" fontSize="14px">
              Password:
            </FormLabel>
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
            <FormHelperText color="blue" mb="40px" fontSize="14px">
              Enter your password
            </FormHelperText>
          </FormControl>

          <Button type="submit" colorScheme="blue" mr="10px">
            Submit
          </Button>
          <Link to="/forgotpassword" color="blue" fontSize="14px">
            Forgot Password?
          </Link>
        </Form>
      </Box>
    </Box>
  );
};

export default Supervisorlogin;
