import { Flex, VStack,Box } from '@chakra-ui/react'

 const RootSidebar = (props) => {
  return (
    <Box margin='20px'>
    <Flex justifyContent='center' mt='100px'>
        <VStack gap='20px' fontSize='12px' fontWeight='bold'>
            {props.children}
        </VStack>
    </Flex>
    </Box>
  )
}

export default RootSidebar


