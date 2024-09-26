import { Heading, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

export default function Reportissues() {
  
    const handleSubmit = (values, { resetForm }) => {
      // Handle form submission (e.g., send data to backend)
      console.log('Submitted Values:', values);
      // Reset form fields
      resetForm();
    };
  
    return (
      <Box p="4">
        <Heading mb="4">Report an Issue</Heading>
        <Formik
          initialValues={{ issue: '', description: '' }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="issue">
                {({ field }) => (
                  <FormControl id="issue" mb="4">
                    <FormLabel>Issue</FormLabel>
                    <Input {...field} placeholder="Enter the issue" />
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <FormControl id="description" mb="4">
                    <FormLabel>Description</FormLabel>
                    <Textarea {...field} placeholder="Enter a description of the issue" />
                  </FormControl>
                )}
              </Field>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>Submit</Button>
            </Form>
          )}
        </Formik>
      </Box>
  )
}
