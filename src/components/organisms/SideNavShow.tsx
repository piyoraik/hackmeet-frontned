import { Button, Flex } from "@chakra-ui/react";
import { Emoji } from "emoji-mart";
import { NextPage } from "next";
import Card from "../atoms/Card";

const SideNavShow: NextPage = () => {
  return (
    <>
      <Flex w="33%" direction="column" align="center">
        <Card title="Wanted Join!">
          <Button colorScheme="blue" width="80%">
            Join
          </Button>
        </Card>
      </Flex>
    </>
  );
};

export default SideNavShow;
