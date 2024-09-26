import { 
  Box, 
  Button, 
  FormControl, 
  FormHelperText, 
  FormLabel,
  Heading,
  Input } from '@chakra-ui/react'
import { Form, Link } from 'react-router-dom'


const Clientlogin = () => {
  return (
    <Box maxW='480px' mx='auto'  my='200px'>
    <Heading as='h2' color='blue' mb='20px'>LOGIN CLIENT </Heading>
    <Form>
      <FormControl isRequired mb='40px'>
        <FormLabel color='blue' fontSize='14px'>Username:</FormLabel>
        <Input type='text' name='username'/>
        <FormHelperText color='blue'fontSize='14px' >Enter your username</FormHelperText>
      </FormControl>

      <FormControl isRequired mb='40px'>
        <FormLabel color='blue' fontSize='14px'>Password:</FormLabel>
        <Input type='password' name='password'/>
        <FormHelperText color='blue' mb='40px' fontSize='14px'>Enter your password</FormHelperText>
      </FormControl>
      <Link to="clientlayout">
        <Button>submit</Button>
      </Link>

      
    </Form>
  </Box>
  )
}

export default Clientlogin
