import { Flex } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import HeaderContent from "../components/modules/HeaderContent";
import ContentList from "../components/organisms/ContentList";
import Footer from "../components/organisms/Footer";
import SideNavIndex from "../components/organisms/SideNavIndex";
import { client } from "../graphql/client";
import { ALL_WANTED, Recruits } from "../graphql/wanted.graphql";
import { Recruit } from "../types/wanted.type";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data, error } = await client.query<Recruits>({
      query: ALL_WANTED,
      fetchPolicy: "network-only",
    });
    return {
      props: {
        stats: "ok",
        recruits: data.recruits,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: {
          status: err.message,
          recruits: null,
        },
      };
    }
    throw err;
  }
};

interface Props {
  status: string;
  recruits: Recruit[]
}

const Home: NextPage<Props> = ({ status, recruits }) => {
  const router = useRouter();

  return (
    <>
      <Flex direction="row" justify="center">
        <SideNavIndex />
        <Flex direction="column" w="75%">
          <Flex justify="flex-end">
            <HeaderContent />
          </Flex>
          <ContentList recruits={recruits} />
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default Home;
