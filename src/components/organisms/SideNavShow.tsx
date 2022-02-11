import { Button, Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import { NextPage } from "next";
import { MdCheckCircle } from "react-icons/md";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { Card } from "@/components/atoms/Card";
import { CardDetail } from "@/components/modules/CardDetail";

interface Props {
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
  joinHandler: () => Promise<void>;
}

export const SideNavShow: NextPage<Props> = ({
  languages,
  frameworks,
  features,
  joinHandler,
}) => {
  return (
    <>
      <Flex w="33%" direction="column" align="center">
        <Card title="Wanted Join!">
          <Button colorScheme="blue" width="80%" onClick={() => joinHandler()}>
            Join
          </Button>
        </Card>
        <CardDetail title="Language">
          <List spacing={3}>
            {languages.map((language, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {language.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
        <CardDetail title="Framework">
          <List spacing={3}>
            {frameworks.map((framework, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {framework.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
        <CardDetail title="Framework">
          <List spacing={3}>
            {features.map((feature, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {feature.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
      </Flex>
    </>
  );
};
