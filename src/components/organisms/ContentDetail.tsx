import { Box, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { Recruit } from "@/types/recruit.type";
import style from "@/styles/github.module.scss";
import Prism from "prismjs";
import { useEffect } from "react";
import { Emoji } from "emoji-mart";

interface Props {
  data: Recruit;
}

const ContentDetail: NextPage<Props> = ({ data }) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <Box
      w="full"
      mt="6"
      p="6"
      boxShadow="md"
      rounded="xl"
      border="1px"
      borderColor="gray.50"
    >
      <Heading mt="2" mb="5" fontSize="2xl">
        {data.title}
      </Heading>
      <Flex
        my="8"
        boxShadow="xs"
        rounded="xl"
        border="1px"
        borderColor="gray.50"
        justify="center"
        justifyItems="center"
        p="3"
      >
        <Emoji emoji={data.thumbnail} size={52} />
      </Flex>
      <Box
        className={`${style.main} prose line-numbers`}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Box>
  );
};

export default ContentDetail;
