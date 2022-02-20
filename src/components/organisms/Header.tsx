import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { HeaderContent } from "@/components/modules/HeaderContent";
import { Title } from "@/components/modules/Title";

export const Header: NextPage = () => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      w={{ base: "100%", md: "80%" }}
      mx="auto"
    >
      <Title />
      <HeaderContent />
    </Flex>
  );
};
