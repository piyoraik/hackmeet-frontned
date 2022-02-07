import { Flex, List, ListItem, ListIcon, Text, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactNode } from "react";
import { BsCheck } from "react-icons/bs";
import { FaAngular, FaVuejs } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";

interface Props {
  title: string;
  icon: ReactNode;
  children: ReactNode
}

const SearchSection: NextPage<Props> = ({title, icon , children}) => {
  return (
    <Flex direction="column" mb="8">
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
      {/* <List spacing={3} pl="5" fontSize="xl" mt="3">
        <ListItem>
          <ListIcon as={GrReactjs} color="blue.300" />
          React
        </ListItem>
        <ListItem>
          <ListIcon as={FaVuejs} color="green.300" />
          Vue
        </ListItem>
        <ListItem>
          <ListIcon as={FaAngular} color="red.300" />
          Angular
        </ListItem>
      </List> */}
    </Flex>
  );
};

export default SearchSection;
