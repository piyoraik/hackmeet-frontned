import { Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import { CardDetail } from "@/components/modules/CardDetail";
import { recruitDetailStateSelector } from "@/recoil/selector/recruitDetailState.selector";
import { useRecoilState } from "recoil";
import { JoinCard } from "../../modules/card/JoinCard";
import { memo } from "react";
import { TechIcon } from "../../atoms/TechIcon";

// eslint-disable-next-line react/display-name
export const SideNavShow: React.VFC = memo(() => {
  const [recruit] = useRecoilState(recruitDetailStateSelector);

  return (
    <>
      <Flex direction="column" align="center">
        <JoinCard />
        <CardDetail title="Language">
          <List spacing={3}>
            {recruit.languages.map((language, idx) => (
              <ListItem key={idx}>
                <TechIcon svg={language.icon} setColor={language.color} />
                {language.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
        <CardDetail title="Framework">
          <List spacing={3}>
            {recruit.frameworks.map((framework, idx) => (
              <ListItem key={idx}>
                <TechIcon svg={framework.icon} setColor={framework.color} />
                {framework.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
        <CardDetail title="Framework">
          <List spacing={3}>
            {recruit.features.map((feature, idx) => (
              <ListItem key={idx}>
                <TechIcon svg={feature.icon} setColor={feature.color} />
                {feature.name}
              </ListItem>
            ))}
          </List>
        </CardDetail>
      </Flex>
    </>
  );
});
