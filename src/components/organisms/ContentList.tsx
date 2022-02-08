import { Grid, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { Recruits } from "@/graphql/wanted.graphql";
import { ContentCard } from "@/components/modules/card/ContentCard";

export const ContentList: NextPage<Recruits> = ({ recruits }) => {
  return (
    <>
      <Heading mt="2" mb="5" fontSize="2xl">
        Wanted List
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {recruits?.map((recruit, idx) => (
          <ContentCard key={idx} recruit={recruit} />
        ))}
      </Grid>
    </>
  );
};
