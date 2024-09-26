import { 
    Box, 
    Button, 
    FormControl, 
    FormHelperText, 
    FormLabel,
    Heading,
    Input } from '@chakra-ui/react'
  import { Form, Link } from 'react-router-dom'

export default function Loginpage() {
  return (
       <Box maxW='480px' mx='auto'  my='200px'>
    <Heading as='h2' color='blue' mb='20px'>LOGIN INVENTORY MANAGER</Heading>
    <Form>
      <FormControl isRequired mb='40px'>
        <FormLabel color='blue' fontSize='14px'>Username:</FormLabel>
        <Input type='text' name='tittle'/>
        <FormHelperText color='blue'fontSize='14px' >Enter your username</FormHelperText>
      </FormControl>

      <FormControl isRequired mb='40px'>
        <FormLabel color='blue' fontSize='14px'>Password:</FormLabel>
        <Input type='password' name='password'/>
        <FormHelperText color='blue' mb='40px' fontSize='14px'>Enter your password</FormHelperText>
      </FormControl>

      <Link to='inventorylayout'><Button type='submit'colorScheme='blue'>Submit</Button></Link>
    </Form>
  </Box>
  )
}
