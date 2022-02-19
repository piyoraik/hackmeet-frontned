import { Flex, Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import UserCard from "@/components/modules/card/UserCard";
import ContentDetail from "@/components/organisms/ContentDetail";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { SideNavShow } from "@/components/organisms/SideBar/SideNavShow";
import { findOneIdRecruitType, FINDONE_WANTED } from "@/graphql/wanted.graphql";
import { Recruit } from "@/types/wanted.type";
import Prism from "prismjs";
import { useEffect } from "react";
import { markdownIt } from "@/lib/markdownIt";
import { useRecoilState } from "recoil";
import { fetchGraphql } from "@/lib/graphql";
import { recruitDetailStateSelector } from "@/recoil/selector/recruitDetailState.selector";
import { DrawerMenu } from "@/components/modules/DrawerMenu";

interface Props {
  data: Recruit;
}

const Wanted: NextPage<Props> = ({ data }) => {
  const [recruit, setRecruit] = useRecoilState(recruitDetailStateSelector);

  useEffect(() => {
    setRecruit({
      ...data,
      content: markdownIt.render(data.content),
    });
    Prism.highlightAll();
  }, []);

  return (
    <>
      <DrawerMenu>
        <SideNavShow />
      </DrawerMenu>
      <Box w={{ base: "100%", md: "80%" }} mx="auto">
        <Header />
        <Flex direction="row" justify="center">
          <Box display={{ base: "none", md: "block" }} w={{ md: "30%" }}>
            <SideNavShow />
          </Box>
          <Flex direction="column" w={{ base: "100%", md: "70%" }}>
            <UserCard user={data.user} />
            <ContentDetail data={recruit} />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
      data: recruit.data.findOneIdRecruit,
    },
  };
};

export default Wanted;
