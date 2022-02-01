import { Box, Flex, Heading, Icon, Textarea } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import Card from "../../components/atoms/Card";
import Header from "../../components/organisms/Header";
import SideNavShow from "../../components/organisms/SideNavShow";
import { VscDebugStart } from "react-icons/vsc";

const NewWanted: NextPage = () => {
  const [text, setText] = useState("");

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
            justify="center"
            height="calc(100vh - 50px)"
            rounded="xl"
            boxShadow="md"
            m=""
            width="60%"
          >
            <Flex justifyContent="space-around" mb="4" width="40%">
              <Flex
                gap={4}
                alignItems="center"
                pb="2"
                borderBottom="4px"
                borderBottomColor="red.400"
              >
                <Icon as={FaCode} color="green.400" boxSize="2rem" />
                Edit
              </Flex>
              <Flex gap={4} alignItems="center">
                <Icon as={VscDebugStart} color="gray.400" boxSize="2rem" />
                Preview
              </Flex>
            </Flex>
            <Textarea
              resize="vertical"
              height="full"
              p="10"
              _focus={{ outline: "none" }}
              onChange={(e) => setText(e.target.value)}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NewWanted;
