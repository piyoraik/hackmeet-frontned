import { Box, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const SearchSection: NextPage<Props> = ({ title, icon, children }) => {
  return (
    <Box mb="8">
      <Flex
        fontSize="2xl"
        color="gray"
        align="center"
        backgroundColor="ping.50"
        p="3"
        m="-3"
        rounded="full"
      >
        {icon}
        <Text ml="3">{title}</Text>
      </Flex>
      {children}
    </Box>
  );
};
