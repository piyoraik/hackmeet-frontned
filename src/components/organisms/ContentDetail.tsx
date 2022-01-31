import { Box, Heading } from "@chakra-ui/react"
import { NextPage } from "next"

const ContentDetail: NextPage = () => {
  return (
    <Box
      w="full"
      h='1000px'
      mt="6"
      p="6"
      boxShadow="md"
      rounded="xl"
      border="1px"
      borderColor="gray.50"
    >
      <Heading mt="2" mb="5" fontSize="xl">
        Wanted Description
      </Heading>
    </Box>
  );
}

export default ContentDetail