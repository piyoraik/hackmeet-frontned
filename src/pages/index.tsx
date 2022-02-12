import { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { useRecoilState } from "recoil";
import { useAuth0 } from "@auth0/auth0-react";
import { Languages } from "prismjs";
import { Flex } from "@chakra-ui/react";
import { fetchGraphql } from "@/lib/graphqlFetch";
import { HeaderContent } from "@/components/modules/HeaderContent";
import { ContentList } from "@/components/organisms/ContentList";
import { Footer } from "@/components/organisms/Footer";
import { SideNavIndex } from "@/components/organisms/SideNavIndex";
import { Features, ALL_FEATURE } from "@/graphql/feature.graphql";
import { Frameworks, ALL_FRAMEWORK } from "@/graphql/framework.graphql";
import { ALL_LANGUAGE } from "@/graphql/language.graphql";
import { ALL_WANTED, Recruits } from "@/graphql/wanted.graphql";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { Recruit } from "@/types/wanted.type";
import { userStateSelector } from "@/recoil/selector/userState.selector";
import { tokenStateSelector } from "@/recoil/selector/tokenState.selector";

interface Props {
  status: string;
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
  const [setToken] = useRecoilState(tokenStateSelector); 
  const { getAccessTokenSilently } = useAuth0();

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


  return (
    <>
      <Flex direction="row" justify="center">
        <SideNavIndex
          languages={languages}
          frameworks={frameworks}
          features={features}
        />
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const recruits = await fetchGraphql<Recruits>(ALL_WANTED, "network-only");
    const languages = await fetchGraphql<Languages>(
      ALL_LANGUAGE,
      "network-only"
    );
    const frameworks = await fetchGraphql<Frameworks>(
      ALL_FRAMEWORK,
      "network-only"
    );
    const features = await fetchGraphql<Features>(ALL_FEATURE, "network-only");

    return {
      props: {
        stats: "ok",
        recruits: recruits.data.recruits,
        languages: languages.data.languages,
        frameworks: frameworks.data.frameworks,
        features: features.data.features,
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

export default Home;
