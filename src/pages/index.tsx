import { Center, Container, Divider, Flex, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import SearchBox from "../components/modules/SearchBox";
import SideNav from "../components/organisms/SideNav";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Flex maxWidth="1656px" direction="row" overflow="hidden">
      <SideNav />
      <Center my="10" mr="8">
        <Divider orientation="vertical" />
      </Center>
      <Flex direction="column" w="75%">
        <Flex direction="row" justify="space-between" my="10" align="center">
          <SearchBox />
          <Spacer />
          <FaBell size="2rem" color="#FCBA03" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
