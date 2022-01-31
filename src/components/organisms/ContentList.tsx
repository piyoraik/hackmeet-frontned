import { Grid, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Card from "../modules/ContentCard";

const ContentList: NextPage = () => {
  return (
    <>
      <Heading mt="2" mb="5" fontSize="2xl">
        Wanted List
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </>
  );
};

export default ContentList;
