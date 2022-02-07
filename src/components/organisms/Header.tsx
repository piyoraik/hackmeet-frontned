import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import HeaderContent from "../modules/HeaderContent";
import Title from "../modules/Title";

const Header: NextPage = () => {
  return (
    <Flex direction="row" justify="space-between" width="93%" mx="auto">
      <Title />
      <HeaderContent />
    </Flex>
  );
};

export default Header;
