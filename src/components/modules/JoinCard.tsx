import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { NextPage } from "next"

const JoinCard: NextPage = () => {
  return (
    <Box
      w="80%"
      mb="6"
      p="6"
      boxShadow="md"
      rounded="xl"
      border="1px"
      borderColor="gray.50"
    >
      <Heading mt="2" mb="5" fontSize="xl">
        Wanted Join!!
        
      </Heading>
      <Center>
        <Button colorScheme="blue" width='80%'>Join</Button>
      </Center>
    </Box>
  );
}

export default JoinCard