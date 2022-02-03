import { Button, Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import { NextPage } from "next";
import { MdCheckCircle } from "react-icons/md";
import { Framework } from "../../types/framework.type";
import { Language } from "../../types/language.type";
import Card from "../atoms/Card";

interface Props {
  languages: Language[];
  frameworks: Framework[]
}

const SideNavShow: NextPage<Props> = ({ languages, frameworks }) => {
  return (
    <>
      <Flex w="33%" direction="column" align="center">
        <Card title="Wanted Join!">
          <Button colorScheme="blue" width="80%">
            Join
          </Button>
        </Card>
        <Card title="Language">
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
            <List spacing={3}>
              {languages.map((language, idx) => (
                <ListItem key={idx}>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  {language.name}
                </ListItem>
              ))}
            </List>
          </Flex>
        </Card>
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
            <List spacing={3}>
              {frameworks.map((framework, idx) => (
                <ListItem key={idx}>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  {framework.name}
                </ListItem>
              ))}
            </List>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};

export default SideNavShow;
