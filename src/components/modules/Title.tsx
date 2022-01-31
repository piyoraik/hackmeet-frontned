import { Flex, Heading, Icon, Center } from "@chakra-ui/react";
import { NextPage } from "next";
import { DiReact } from "react-icons/di";

const Title: NextPage = () => {
  return (
    <Flex mt="8" mb="8">
      <Icon as={DiReact} boxSize="24" />
      <Center>
        <Heading ml="3" fontWeight="800" fontSize="xl" alignItems="center">
          HogeHoge
        </Heading>
      </Center>
    </Flex>
  );
};

export default Title;
