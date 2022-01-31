import { Box, Flex, Spacer } from "@chakra-ui/react";
import { NextPage } from "next";
import { FaBell } from "react-icons/fa";
import SearchBox from "../modules/SearchBox";
import Title from "../modules/Title";

const Header: NextPage = () => {
  return (
    <Flex direction="row" justify="space-between" width="93%" mx="auto">
      <Title />
      <Flex direction="row" justify="space-between" my="10" align="center">
        <Box mr='12'>
          <SearchBox />
        </Box>
        <Box>
          <FaBell size="2rem" color="#FCBA03" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
