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
import { VscDebugStart } from "react-icons/vsc";
import style from "@/styles/github.module.scss";
import Prism from "prismjs";
import { MdSend } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { CreateRecruitsDTOType, CREATE_WANTED } from "@/graphql/wanted.graphql";
import { markdownIt } from "@/lib/markdownIt";
import { useRouter } from "next/router";
import ThumbnailCard from "@/components/modules/card/ThumbnailCard";
import AddSelectCard from "@/components/modules/card/AddSelectCard";
import { ALL_LANGUAGE, Languages } from "@/graphql/language.graphql";
import { Language } from "@/types/language.type";
import { fetchGraphql, mutationGraphql } from "@/lib/graphql";
import { ALL_FRAMEWORK, Frameworks } from "@/graphql/framework.graphql";
import { Framework } from "@/types/framework.type";
import { ALL_FEATURE, Features } from "@/graphql/feature.graphql";
import { Feature } from "@/types/feature.type";
import { Footer } from "@/components/organisms/Footer";
import { PeoplesCard } from "@/components/modules/card/PeoplesCard";
import { useAuth0 } from "@auth0/auth0-react";
import { SectionItem } from "@/types/sectionItem.type";
import { RecruitAddMenu } from "@/components/modules/RecruitAddMenu";
import { DrawerMenu } from "@/components/modules/DrawerMenu";

interface Props {
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

const NewWanted: NextPage<Props> = ({ languages, frameworks, features }) => {
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [contentMD, setContentMD] = useState("");
  const [thumbnailName, setThumbnailName] = useState("partying_face");
  const [useLanguageList, setUseLanguageList] = useState<SectionItem[]>([]);
  const [useFrameworkList, setUseFrameworkList] = useState<SectionItem[]>([]);
  const [useFeatureList, setUseFeatureList] = useState<SectionItem[]>([]);
  const [peoples, setPeoples] = useState("");

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const targetValue = event.target.value;
    setContentMD(targetValue);
    setContentHTML(markdownIt.render(targetValue));
  };

  const submitHandler = async () => {
    try {
      const languageIds = useLanguageList.map((language) => {
        return language.id;
      });
      const frameworkIds = useFrameworkList.map((framework) => {
        return framework.id;
      });
      const featureIds = useFeatureList.map((feature) => {
        return feature.id;
      });

      const accessToken = await getAccessTokenSilently({});
      const params = {
        param: {
          title,
          thumbnail: thumbnailName,
          content: contentMD,
          languages: languageIds,
          frameworks: frameworkIds,
          features: featureIds,
          peoples: +peoples,
        },
      };
      const res = await mutationGraphql<CreateRecruitsDTOType>(
        CREATE_WANTED,
        params,
        accessToken
      );

      const resId = res?.createRecruit.id;
      router.push(`/wanted/${resId}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [contentMD]);

  return (
    <>
      <DrawerMenu>
        <Box>
          <RecruitAddMenu
            thumbnailName={thumbnailName}
            setThumbnailName={setThumbnailName}
            peoples={peoples}
            setPeoples={setPeoples}
            useLanguageList={useLanguageList}
            setUseLanguageList={setUseLanguageList}
            useFrameworkList={useFrameworkList}
            setUseFrameworkList={setUseFrameworkList}
            useFeatureList={useFeatureList}
            setUseFeatureList={setUseFeatureList}
            languages={languages}
            frameworks={frameworks}
            features={features}
          />
        </Box>
      </DrawerMenu>
      <Flex direction="column" justify="center">
        <Heading mt="2" mb="5" mx="3" fontSize="2xl">
          New Wanted
        </Heading>
        <Flex>
          <Box display={{ base: "none", md: "block" }} w={{ md: "35%" }}>
            <RecruitAddMenu
              thumbnailName={thumbnailName}
              setThumbnailName={setThumbnailName}
              peoples={peoples}
              setPeoples={setPeoples}
              useLanguageList={useLanguageList}
              setUseLanguageList={setUseLanguageList}
              useFrameworkList={useFrameworkList}
              setUseFrameworkList={setUseFrameworkList}
              useFeatureList={useFeatureList}
              setUseFeatureList={setUseFeatureList}
              languages={languages}
              frameworks={frameworks}
              features={features}
            />
          </Box>
          <Flex
            direction="column"
            justify="flex-start"
            rounded="xl"
            boxShadow="md"
            m=""
            w={{ base: "100%", md: "80%" }}
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const languages = await fetchGraphql<Languages>(ALL_LANGUAGE, "network-only");
  const frameworks = await fetchGraphql<Frameworks>(
    ALL_FRAMEWORK,
    "network-only"
  );
  const features = await fetchGraphql<Features>(ALL_FEATURE, "network-only");
  return {
    props: {
      languages: languages.data.languages,
      frameworks: frameworks.data.frameworks,
      features: features.data.features,
    },
  };
};

export default NewWanted;
