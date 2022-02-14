import { Flex, Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import UserCard from "@/components/modules/card/UserCard";
import ContentDetail from "@/components/organisms/ContentDetail";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { SideNavShow } from "@/components/organisms/SideNavShow";
import { findOneIdRecruitType, FINDONE_WANTED } from "@/graphql/wanted.graphql";
import { Recruit } from "@/types/wanted.type";
import Prism from "prismjs";
import { useEffect } from "react";
import { markdownIt } from "@/lib/markdownIt";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilState } from "recoil";
import { fetchGraphql } from "@/lib/graphqlFetch";
import { recruitDetailStateSelector } from "@/recoil/selector/recruitDetailState.selector";
import { tokenStateSelector } from "@/recoil/selector/tokenState.selector";

interface Props {
  status: string;
  data: Recruit;
}

const Wanted: NextPage<Props> = ({ status, data }) => {
  const [recruit, setRecruit] = useRecoilState(recruitDetailStateSelector);
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useRecoilState(tokenStateSelector);

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (err) {
        console.error("ログインが必要です。");
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    setRecruit({
      ...data,
      content: markdownIt.render(data.content),
    });
    Prism.highlightAll();
  }, []);

  return (
    <Box width="80%" mx="auto">
      <Header />
      <Flex direction="row" justify="center">
        <SideNavShow />
        <Flex direction="column" w="60%">
          <UserCard user={data.user} />
          <ContentDetail data={recruit} />
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    if (id === undefined) throw new Error("Not Found");

    const recruit = await fetchGraphql<findOneIdRecruitType>(
      FINDONE_WANTED,
      "network-only",
      {
        id,
      }
    );

    return {
      props: {
        stats: "ok",
        data: recruit.data.findOneIdRecruit,
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

export default Wanted;
