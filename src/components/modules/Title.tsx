import { Flex, Heading, Icon, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DiReact } from "react-icons/di";

export const Title: React.VFC = () => {
  const router = useRouter();

  return (
    <Flex my="10" onClick={() => router.push("/")}>
      <Icon as={DiReact} boxSize="24" />
      <Center>
        <Heading ml="3" fontWeight="800" fontSize="xl" alignItems="center">
          HackMeet
        </Heading>
      </Center>
    </Flex>
  );
};