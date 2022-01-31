import { Flex, List, ListItem, ListIcon, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactNode } from "react";
import { CgProfile } from "react-icons/cg";
import { MdCheckCircle } from "react-icons/md";

interface Props {
  title: string;
  icon: ReactNode;
}

const SearchSection: NextPage<Props> = (props) => {
  const { title, icon } = props;
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
        {/* <CgProfile color="ping" /> */}
        {icon}
        <Text ml="3">{title}</Text>
      </Flex>
      <List spacing={3} pl="5" fontSize="xl" mt="3">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          React
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Vue
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Angular
        </ListItem>
      </List>
    </Flex>
  );
};

export default SearchSection;
