import { Flex, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { SearchBox } from "@/components/modules/SearchBox";
import { HeaderMenu } from "./HeaderMenu";

export const HeaderContent: NextPage = () => {
  return (
    <Flex justify="end" gap="6" my="10" align="center">
      <Box>
        <SearchBox />
      </Box>
      <HeaderMenu />
    </Flex>
  );
};
