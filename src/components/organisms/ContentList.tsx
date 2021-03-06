import { Flex, Heading, Wrap } from "@chakra-ui/react";
import { NextPage } from "next";
import { Recruits } from "@/graphql/recruit.graphql";
import { ContentCard } from "@/components/modules/card/ContentCard";

export const ContentList: NextPage<Recruits> = ({ recruits }) => {
  return (
    <>
      <Heading mt="2" mb="5" fontSize="2xl">
        Wanted List
      </Heading>
      <Flex gap="6" wrap="wrap" justify="flex-start" w="100%">
        {recruits?.map((recruit, idx) => (
          <ContentCard key={idx} recruit={recruit} />
        ))}
      </Flex>
    </>
  );
};
