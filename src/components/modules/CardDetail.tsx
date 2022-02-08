import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactNode } from "react";
import {Card} from "@/components/atoms/Card";

interface Props {
  children: ReactNode;
  title: string;
}

export const CardDetail: NextPage<Props> = ({ title, children }) => {
  return (
    <Card title="Framework">
      <Flex
        width="80%"
        mx="auto"
        boxShadow="md"
        rounded="xl"
        border="1px"
        borderColor="gray.50"
        justify="center"
        justifyItems="center"
        p="3"
      >
        {children}
      </Flex>
    </Card>
  );
};