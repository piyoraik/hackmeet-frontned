import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { FaBell } from "react-icons/fa";
import SearchBox from "../components/modules/SearchBox";
import ContentList from "../components/organisms/ContentList";
import Footer from "../components/organisms/Footer";
import SideNavIndex from "../components/organisms/SideNavIndex";

const Home: NextPage = () => {
  return (
    <>
      <Flex direction="row" justify="center">
        <SideNavIndex />
        <Flex direction="column" w="75%">
          <Flex direction="row" justify="space-between" my="10" align="center">
            <Box width='60%'>
              <SearchBox />
            </Box>
            <FaBell size="2rem" color="#FCBA03" />
          </Flex>
          <ContentList />
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default Home;
