import { Center, Divider, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { Title } from "@/components/modules/Title";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { LanguageSection } from "../modules/section/LanguageSection";
import { FrameworkSection } from "../modules/section/FrameworkSection";
import { FeatureSection } from "../modules/section/FeatureSection";

interface Props {
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

export const SideNavIndex: NextPage<Props> = ({
  languages,
  frameworks,
  features,
}) => {
  return (
    <>
      <Flex w="18%" direction="column" align="center">
        <Title />
        <Flex direction="column" justify="space-between">
          <Flex direction="column" justify="space-evenly">
            <LanguageSection languages={languages} />
            <FrameworkSection frameworks={frameworks} />
            <FeatureSection features={features} />
          </Flex>
        </Flex>
      </Flex>
      <Center my="10" mr="8">
        <Divider orientation="vertical" />
      </Center>
    </>
  );
};
