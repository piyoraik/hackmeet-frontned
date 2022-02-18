import { Flex, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { SearchBox } from "@/components/modules/SearchBox";
import { HeaderMenu } from "./HeaderMenu";

export const HeaderContent: NextPage = () => {
  return (
    <>
      <Flex
        direction="row"
        justify="space-around"
        my="10"
        align="center"
        width="30%"
      >
        <Box>
          <SearchBox />
        </Box>
        <HeaderMenu />
      </Flex>
    </>
  );
};
