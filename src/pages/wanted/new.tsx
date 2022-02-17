import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Header } from "@/components/organisms/Header";
import { VscDebugStart } from "react-icons/vsc";
import style from "@/styles/github.module.scss";
import Prism from "prismjs";
import { MdSend } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { client, httpHeader } from "@/lib/client";
import { CreateRecruitsDTOType, CREATE_WANTED } from "@/graphql/wanted.graphql";
import { markdownIt } from "@/lib/markdownIt";
import { useRouter } from "next/router";
import ThumbnailCard from "@/components/modules/card/ThumbnailCard";
import LanguageCard from "@/components/modules/card/LanguageCard";
import { ALL_LANGUAGE, Languages } from "@/graphql/language.graphql";
import { Language } from "@/types/language.type";
import { fetchGraphql } from "@/lib/graphqlFetch";
import { ALL_FRAMEWORK, Frameworks } from "@/graphql/framework.graphql";
import { Framework } from "@/types/framework.type";
import FrameworkCard from "@/components/modules/card/FrameworkCard";
import { ALL_FEATURE, Features } from "@/graphql/feature.graphql";
import { Feature } from "@/types/feature.type";
import FeatureCard from "@/components/modules/card/FeatureCard";
import { Footer } from "@/components/organisms/Footer";
import { InputSelectType } from "@/types/addWanted.type";
import { PeoplesCard } from "@/components/modules/card/PeoplesCard";
import { getAccessToken, Session } from "@auth0/nextjs-auth0";
import { GetSession } from "@/lib/getSession";

interface Props {
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

const NewWanted: NextPage<Props> = ({ languages, frameworks, features }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [contentMD, setContentMD] = useState("");
  const [thumbnailName, setThumbnailName] = useState("partying_face");
  const [useLanguageList, setUseLanguageList] = useState<InputSelectType[]>([]);
  const [useFrameworkList, setUseFrameworkList] = useState<InputSelectType[]>(
    []
  );
  const [useFeatureList, setUseFeatureList] = useState<InputSelectType[]>([]);
  const [peoples, setPeoples] = useState("");

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const targetValue = event.target.value;
    setContentMD(targetValue);
    setContentHTML(markdownIt.render(targetValue));
  };

  const submitHandler = async () => {
    try {
      const getSession = await GetSession();
      const link = httpHeader(getSession.session.accessToken);
      const languageIds = useLanguageList.map((language) => {
        return language.id;
      });
      const frameworkIds = useFrameworkList.map((framework) => {
        return framework.id;
      });
      const featureIds = useFeatureList.map((feature) => {
        return feature.id;
      });

      const res = await client(link).mutate<CreateRecruitsDTOType>({
        mutation: CREATE_WANTED,
        variables: {
          param: {
            title,
            thumbnail: thumbnailName,
            content: contentMD,
            languages: languageIds,
            frameworks: frameworkIds,
            features: featureIds,
            peoples: +peoples,
          },
        },
      });
      if (res == undefined) throw Error("Error");
      const resId = res.data?.createRecruit.id;
      router.push(`/wanted/${resId}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [contentMD]);

  return (
    <Box width="80%" mx="auto">
      <Header />
      <Flex direction="column" justify="center">
        <Heading mt="2" mb="5" mx="3" fontSize="2xl">
          New Wanted
        </Heading>
        <Flex>
          <Flex w="33%" direction="column" align="center">
            <ThumbnailCard name={thumbnailName} setFn={setThumbnailName} />
            <PeoplesCard peoples={peoples} setFn={setPeoples} />
            <LanguageCard
              useLanguageList={useLanguageList}
              setFn={setUseLanguageList}
              languages={languages}
            />
            <FrameworkCard
              useFrameworkList={useFrameworkList}
              setFn={setUseFrameworkList}
              frameworks={frameworks}
            />
            <FeatureCard
              useFeatureList={useFeatureList}
              setFn={setUseFeatureList}
              features={features}
            />
          </Flex>
          <Flex
            direction="column"
            justify="flex-start"
            rounded="xl"
            boxShadow="md"
            m=""
            width="60%"
          >
            <Box p="4">
              <Heading fontSize="2xl" p="2">
                Title
              </Heading>
              <Input
                placeholder="Title"
                value={title}
                backgroundColor="gray.50"
                onChange={(e) => setTitle(e.target.value)}
                _focus={{ outline: "none" }}
              />
            </Box>
            <Box p="4">
              <Heading fontSize="2xl" p="2">
                Contents
              </Heading>
              <Tabs
                justifyContent="space-around"
                my="4"
                variant="soft-rounded"
                colorScheme="blue"
              >
                <TabList justifyContent="space-around">
                  <Tab gap="6">
                    <Icon as={FaCode} color="green.400" boxSize="2rem" />
                    Edit
                  </Tab>
                  <Tab gap="6">
                    <Icon as={VscDebugStart} color="gray.400" boxSize="2rem" />
                    Preview
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px="0">
                    <Textarea
                      resize="vertical"
                      height="700px"
                      maxHeight="1000px"
                      backgroundColor="gray.50"
                      p="10"
                      _focus={{ outline: "none" }}
                      onChange={(e) => changeHandler(e)}
                    />
                  </TabPanel>
                  <TabPanel px="0">
                    <Box
                      className={`${style.main} prose line-numbers`}
                      minHeight="700px"
                      p="8"
                      border="2px"
                      borderRadius="md"
                      borderColor="gray.200"
                      dangerouslySetInnerHTML={{ __html: contentHTML }}
                    />
                  </TabPanel>
                </TabPanels>
                <Flex px="8" py="4" justifyContent="space-around">
                  <Button
                    rightIcon={<RiDraftLine />}
                    colorScheme="blue"
                    variant="outline"
                    width="45%"
                  >
                    Draft
                  </Button>
                  <Button
                    rightIcon={<MdSend />}
                    colorScheme="blue"
                    variant="outline"
                    width="45%"
                    onClick={() => submitHandler()}
                  >
                    Send
                  </Button>
                </Flex>
              </Tabs>
            </Box>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const languages = await fetchGraphql<Languages>(ALL_LANGUAGE, "network-only");
  const frameworks = await fetchGraphql<Frameworks>(
    ALL_FRAMEWORK,
    "network-only"
  );
  const features = await fetchGraphql<Features>(ALL_FEATURE, "cache-first");
  return {
    props: {
      languages: languages.data.languages,
      frameworks: frameworks.data.frameworks,
      features: features.data.features,
    },
  };
};

export default NewWanted;
