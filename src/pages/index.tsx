import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import HeaderContent from "../components/modules/HeaderContent";
import ContentList from "../components/organisms/ContentList";
import Footer from "../components/organisms/Footer";
import SideNavIndex from "../components/organisms/SideNavIndex";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Flex direction="row" justify="center">
        <SideNavIndex />
        <Flex direction="column" w="75%">
          <Flex justify='flex-end'>
            <HeaderContent />
          </Flex>
          <ContentList />
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default Home;
