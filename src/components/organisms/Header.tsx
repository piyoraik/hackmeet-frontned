import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { HeaderContent } from '@/components/modules/HeaderContent'
import { Title } from '@/components/modules/Title'

export const Header: NextPage = () => {
  return (
    <Flex direction="row" justify="space-between" width="93%" mx="auto">
      <Title />
      <HeaderContent />
    </Flex>
  );
};