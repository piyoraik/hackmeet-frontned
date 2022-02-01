import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import JoinCard from "../modules/JoinCard";

const SideNavShow: NextPage = () => {
  return (
    <>
      <Flex w="33%" direction="column" align="center">
        <JoinCard />
      </Flex>
    </>
  );
};

export default SideNavShow;
