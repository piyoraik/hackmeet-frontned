import { Center, Divider, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { Title } from "@/components/modules/Title";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { IndexLanguageSection } from "../modules/section/IndexLanguageSection";
import { IndexFrameworkSection } from "../modules/section/IndexFrameworkSection";
import { IndexFeatureSection } from "../modules/section/IndexFeatureSection";

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
            <IndexLanguageSection languages={languages} />
            <IndexFrameworkSection frameworks={frameworks} />
            <IndexFeatureSection features={features} />
          </Flex>
        </Flex>
      </Flex>
      <Center my="10" mr="8">
        <Divider orientation="vertical" />
      </Center>
    </>
  );
};
