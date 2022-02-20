import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Languages } from "prismjs";
import { Box, Center, Divider, Flex } from "@chakra-ui/react";
import { fetchGraphql } from "@/lib/graphql";
import { ContentList } from "@/components/organisms/ContentList";
import { SideNavIndex } from "@/components/organisms/SideBar/SideNavIndex";
import { Features, ALL_FEATURE } from "@/graphql/feature.graphql";
import { Frameworks, ALL_FRAMEWORK } from "@/graphql/framework.graphql";
import { ALL_LANGUAGE } from "@/graphql/language.graphql";
import {
  ALL_WANTED,
  Recruits,
  searchRecruitType,
  SEARCH_WANTED,
} from "@/graphql/recruit.graphql";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { Recruit } from "@/types/recruit.type";
import { userStateSelector } from "@/recoil/selector/userState.selector";
import { useRecoilState } from "recoil";
import { useAuth0 } from "@auth0/auth0-react";
import { FIND_USER, FIND_USERID } from "@/graphql/user.grpahql";
import { useEffect, useState } from "react";
import { DrawerMenu } from "@/components/modules/DrawerMenu";
import { AccordionSectionMenu } from "@/components/organisms/AccordionSectionMenu";
import { recruitUseSelectStateSelector } from "@/recoil/selector/recruitUseSelectState.selector";

interface Props {
  recruits: Recruit[];
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

const Home: NextPage<Props> = ({
  recruits,
  languages,
  frameworks,
  features,
}) => {
  const { user } = useAuth0();
  const router = useRouter();
  const [loginUser, setLoginUser] = useRecoilState(userStateSelector);
  const [selector, setSelector] = useRecoilState(recruitUseSelectStateSelector);
  const [recruitList, setRecruitList] = useState<Recruit[]>(recruits);

  useEffect(() => {
    if (user === undefined) return;
    const fetchUser = async () => {
      const res = await fetchGraphql<FIND_USER>(FIND_USERID, "network-only", {
        userId: user.sub,
      })
        .then((res) => {
          setLoginUser(res.data.findUserId);
        })
        .catch((err) => {
          console.error(err);
        });
      return res;
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      fetchGraphql<Recruits>(ALL_WANTED, "network-only").then((res) => {
        setRecruitList(res.data.recruits);
      });
      return;
    }
    const searchRecruit = async () => {
      if (!router.query.language) router.query.language = [];
      if (!router.query.framework) router.query.framework = [];
      if (!router.query.feature) router.query.feature = [];
      const l =
        typeof router.query.language === "string"
          ? [router.query.language]
          : router.query.language;
      const f =
        typeof router.query.framework === "string"
          ? [router.query.framework]
          : router.query.framework;
      const fe =
        typeof router.query.feature === "string"
          ? [router.query.feature]
          : router.query.feature;

      const params = {
        params: {
          title: "",
          languages: l,
          frameworks: f,
          features: fe,
        },
      };
      await fetchGraphql<searchRecruitType>(
        SEARCH_WANTED,
        "network-only",
        params
      )
        .then((res) => {
          setRecruitList(res.data.searchRecruit);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    searchRecruit();
  }, [router.query]);

  return (
    <>
      <DrawerMenu>
        <AccordionSectionMenu
          languages={languages}
          frameworks={frameworks}
          features={features}
        />
      </DrawerMenu>
      <Flex direction="row" justify="center" gap="6">
        <SideNavIndex
          languages={languages}
          frameworks={frameworks}
          features={features}
        />
        <Center my="10" display={{ base: "none", md: "block" }}>
          <Divider orientation="vertical" />
        </Center>
        <Box flex="1" w="100%">
          <ContentList recruits={recruitList} />
        </Box>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recruits = await fetchGraphql<Recruits>(ALL_WANTED, "network-only");
  const languages = await fetchGraphql<Languages>(ALL_LANGUAGE, "network-only");
  const frameworks = await fetchGraphql<Frameworks>(
    ALL_FRAMEWORK,
    "network-only"
  );
  const features = await fetchGraphql<Features>(ALL_FEATURE, "network-only");

  return {
    props: {
      recruits: recruits.data.recruits,
      languages: languages.data.languages,
      frameworks: frameworks.data.frameworks,
      features: features.data.features,
    },
    revalidate: 15,
  };
};

export default Home;
