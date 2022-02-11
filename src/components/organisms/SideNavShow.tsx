import { Button, Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import { NextPage } from "next";
import { MdCheckCircle } from "react-icons/md";
import { Card } from "@/components/atoms/Card";
import { CardDetail } from "@/components/modules/CardDetail";
import { recruitDetailStateSelector } from "@/recoil/selector/recruitDetailState.selector";
import { useRecoilState } from "recoil";
import { JoinCard } from "../modules/card/JoinCard";

export const SideNavShow: NextPage = () => {
  const [recruit] = useRecoilState(recruitDetailStateSelector);

  return (
    <>
      <Flex w="33%" direction="column" align="center">
        <JoinCard />
        <CardDetail title="Language">
          <List spacing={3}>
            {recruit.languages.map((language, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {language.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
        <CardDetail title="Framework">
          <List spacing={3}>
            {recruit.frameworks.map((framework, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {framework.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
        <CardDetail title="Framework">
          <List spacing={3}>
            {recruit.features.map((feature, idx) => (
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
