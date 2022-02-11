import { Flex, Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import UserCard from "@/components/modules/card/UserCard";
import ContentDetail from "@/components/organisms/ContentDetail";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { SideNavShow } from "@/components/organisms/SideNavShow";
import { client, httpHeader } from "@/lib/client";
import { findOneIdRecruitType, FINDONE_WANTED } from "@/graphql/wanted.graphql";
import { initialRecruit, Recruit } from "@/types/wanted.type";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import { markdownIt } from "@/lib/markdownIt";
import { useAuth0 } from "@auth0/auth0-react";
import { tokenStateSelector } from "@/recoil/selector/tokenState.selector";
import { useRecoilState } from "recoil";
import { CreateJoinType, CREATE_JOIN } from "@/graphql/join.graphql";
import { useRouter } from "next/router";
import { fetchGraphql } from "@/lib/graphqlFetch";

interface Props {
  status: string;
  data: Recruit;
}

const Wanted: NextPage<Props> = ({ status, data }) => {
  const router = useRouter();
  const { id } = router.query;

  const [recruit, setRecruit] = useState<Recruit>(initialRecruit);
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useRecoilState(tokenStateSelector);

  useEffect(() => {
    setRecruit({
      ...data,
      content: markdownIt.render(data.content),
    });
    Prism.highlightAll();
    const fetchToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
    };
    fetchToken();
  }, [data, getAccessTokenSilently, setToken]);

  const joinHandler = async () => {
    console.log(id);
    try {
      const link = httpHeader(token);
      const res = await client(link).mutate<CreateJoinType>({
        mutation: CREATE_JOIN,
        variables: {
          param: {
            recruit: id,
          },
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box width="80%" mx="auto">
      <Header />
      <Flex direction="row" justify="center">
        <SideNavShow
          languages={data.languages}
          frameworks={data.frameworks}
          features={data.features}
          joinHandler={joinHandler}
        />
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
