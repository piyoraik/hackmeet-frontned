import { Box, Heading, Center, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export const Card: NextPage<Props> = ({ children, title }) => {
  return (
    <Box
      w="90%"
      mx="auto"
      mb="6"
      p="6"
      boxShadow="md"
      rounded="xl"
      border="1px"
      borderColor="gray.50"
    >
      <Heading mt="2" mb="5" fontSize="xl">
        {title}
      </Heading>
      <Center>{children}</Center>
    </Box>
  );
};
