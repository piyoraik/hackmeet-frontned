import {
  Box,
  Flex,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Card from "../../components/atoms/Card";
import Header from "../../components/organisms/Header";
import { VscDebugStart } from "react-icons/vsc";
import MarkdownIt from "markdown-it";
import style from "../../styles/github.module.scss";
import Prism from "prismjs";
// import style from "@/style/github.scss";

const NewWanted: NextPage = () => {
  const [text, setText] = useState("");

  const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  const changeHandler = (event: any) => {
    const res = markdownIt.render(event.target.value!);
    console.log(res);
    setText(res);
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
            <Card title="Tag">
              <Box>aaaa</Box>
            </Card>
            <Card title="Thumbnail">
              <Box>aaaa</Box>
            </Card>
            <Card title="Language">
              <Box>aaaa</Box>
            </Card>
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
            <Tabs
              justifyContent="space-around"
              mb="4"
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
                <TabPanel>
                  <Textarea
                    resize="vertical"
                    height="calc(100vh - 50px)"
                    p="10"
                    _focus={{ outline: "none" }}
                    onChange={(e) => changeHandler(e)}
                  />
                </TabPanel>
                <TabPanel>
                  <Box
                    className={`${style.main} prose`}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NewWanted;
