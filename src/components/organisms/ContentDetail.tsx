import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { Recruit } from "../../types/wanted.type";
import style from "../../styles/github.module.scss";
import Prism from "prismjs";
import { useEffect } from "react";

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
      h="1000px"
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
      <Box
        className={`${style.main} prose`}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Box>
  );
};

export default ContentDetail;