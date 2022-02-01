import { Flex, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import router from "next/router";
import { BsPlusSquare } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import SearchBox from "./SearchBox";

const HeaderContent: NextPage = () => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      my="10"
      align="center"
      width="30%"
    >
      <Box>
        <SearchBox />
      </Box>
      <Box>
        <BsPlusSquare size="2rem" onClick={() => router.push("/wanted/new")} />
      </Box>
      <Box>
        <FaBell size="2rem" color="#FCBA03" />
      </Box>
    </Flex>
  );
}

export default HeaderContent