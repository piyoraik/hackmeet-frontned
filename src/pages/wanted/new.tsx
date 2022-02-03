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
import Card from "../../components/atoms/Card";
import Header from "../../components/organisms/Header";
import { VscDebugStart } from "react-icons/vsc";
import style from "../../styles/github.module.scss";
import Prism from "prismjs";
import { MdSend } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { client } from "../../graphql/client";
import {
  CreateRecruitsDTOType,
  CREATE_WANTED,
} from "../../graphql/wanted.graphql";
import { markdownIt } from "../../lib/markdownIt";
import { useRouter } from "next/router";
import ThumbnailCard from "../../components/modules/ThumbnailCard";
import LanguageCard from "../../components/modules/LanguageCard";
import { ALL_LANGUAGE, Languages } from "../../graphql/language.graphql";
import { Language } from "../../types/language.type";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data, error } = await client.query<Languages>({
      query: ALL_LANGUAGE,
      fetchPolicy: "cache-first",
    });
    return {
      props: {
        stats: "ok",
        languages: data.languages,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: {
          status: err.message,
          languages: null,
        },
      };
    }
    throw err;
  }
};

interface Props {
  status: string;
  languages: Language[];
}

const NewWanted: NextPage<Props> = ({ status, languages }) => {
  console.log(languages);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [contentMD, setContentMD] = useState("");
  const [thumbnailName, setThumbnailName] = useState("partying_face");
  const [useLanguageList, setUseLanguageList] = useState<Language[]>([]);

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const targetValue = event.target.value;
    setContentMD(targetValue);
    setContentHTML(markdownIt.render(targetValue));
  };

  const submitHandler = async () => {
    try {
      const res = await client.mutate<CreateRecruitsDTOType>({
        mutation: CREATE_WANTED,
        variables: {
          param: {
            title,
            thumbnail: thumbnailName,
            content: contentMD,
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
  });

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
            <Card title="Tag">
              <Box>aaaa</Box>
            </Card>
            <LanguageCard
              useLanguageList={useLanguageList}
              setFn={setUseLanguageList}
              languages={languages}
            />
            <Card title="Framework">
              <Box>aaaa</Box>
            </Card>
            <Card title="Feature">
              <Box>aaaa</Box>
            </Card>
            <Card title="Content">
              <Box>aaaa</Box>
            </Card>
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
      </Flex>
    </Box>
  );
};

export default NewWanted;
