import { Flex } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0";
import { Languages } from "prismjs";
import HeaderContent from "../components/modules/HeaderContent";
import ContentList from "../components/organisms/ContentList";
import Footer from "../components/organisms/Footer";
import SideNavIndex from "../components/organisms/SideNavIndex";
import { Features, ALL_FEATURE } from "../graphql/feature.graphql";
import { Frameworks, ALL_FRAMEWORK } from "../graphql/framework.graphql";
import { ALL_LANGUAGE } from "../graphql/language.graphql";
import { ALL_WANTED, Recruits } from "../graphql/wanted.graphql";
import { fetchGraphql } from "../lib/graphqlFetch";
import { Feature } from "../types/feature.type";
import { Framework } from "../types/framework.type";
import { Language } from "../types/language.type";
import { Recruit } from "../types/wanted.type";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const recruits = await fetchGraphql<Recruits>(ALL_WANTED, "network-only");
    const languages = await fetchGraphql<Languages>(
      ALL_LANGUAGE,
      "network-only"
    );
    const frameworks = await fetchGraphql<Frameworks>(
      ALL_FRAMEWORK,
      "cache-first"
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

interface Props {
  status: string;
  recruits: Recruit[];
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

const Home: NextPage<Props> = ({
  status,
  recruits,
  languages,
  frameworks,
  features,
}) => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  console.log(error);
  console.log(isLoading);

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

export default Home;
