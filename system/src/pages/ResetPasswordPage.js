import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.put('http://localhost:8000/newpassword', {
          email: values.email,
          password: values.password,
        });
        console.log('Password updated successfully:', response.data);
        // You can redirect the user or show a success message here
      } catch (error) {
        console.error('Error updating password:', error);
        // You can show an error message to the user here
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box p={4} maxWidth="400px" mx="auto">
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={formik.touched.email && formik.errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.password && formik.errors.password}>
            <FormLabel htmlFor="password">New Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your new password"
              {...formik.getFieldProps('password')}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          >
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              {...formik.getFieldProps('confirmPassword')}
            />
            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={formik.isSubmitting}>
            Reset Password
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;
