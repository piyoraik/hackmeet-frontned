import { Flex, Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import UserCard from "../../components/modules/UserCard";
import ContentDetail from "../../components/organisms/ContentDetail";
import Footer from "../../components/organisms/Footer";
import Header from "../../components/organisms/Header";
import SideNavShow from "../../components/organisms/SideNavShow";
import { client } from "../../lib/client";
import {
  findOneIdRecruitType,
  FINDONE_WANTED,
} from "../../graphql/wanted.graphql";
import { initialRecruit, Recruit } from "../../types/wanted.type";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import { markdownIt } from "../../lib/markdownIt";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    if (id === undefined) throw new Error("Not Found");
    const { data, error } = await client.query<findOneIdRecruitType>({
      query: FINDONE_WANTED,
      variables: {
        id: id,
      },
    });
    return {
      props: {
        stats: "ok",
        data: data.findOneIdRecruit,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: {
          status: err.message,
          data: null,
        },
      };
    }
    throw err;
  }
};

interface Props {
  status: string;
  data: Recruit;
}

const Wanted: NextPage<Props> = ({ status, data }) => {
  const [recruit, setRecruit] = useState<Recruit>(initialRecruit);

  useEffect(() => {
    setRecruit({
      ...data,
      content: markdownIt.render(data.content),
    });
    Prism.highlightAll();
  }, [data]);

  return (
    <Box width="80%" mx="auto">
      <Header />
      <Flex direction="row" justify="center">
        <SideNavShow
          languages={data.languages}
          frameworks={data.frameworks}
          features={data.features}
        />
        <Flex direction="column" w="60%">
          <UserCard />
          <ContentDetail data={recruit} />
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
};

export default Wanted;
