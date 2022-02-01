import { Flex, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import UserCard from "../../components/modules/UserCard";
import ContentDetail from "../../components/organisms/ContentDetail";
import Footer from "../../components/organisms/Footer";
import Header from "../../components/organisms/Header";
import SideNavShow from "../../components/organisms/SideNavShow";

const Wanted: NextPage = () => {
  return (
    <Box width="80%" mx="auto">
      <Header />
      <Flex direction="row" justify="center">
        <SideNavShow />
        <Flex direction="column" w="60%">
          <UserCard />
          <ContentDetail />
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
};

export default Wanted;
