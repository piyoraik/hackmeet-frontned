import { Accordion, Center, Divider, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { Title } from "@/components/modules/Title";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { IndexSideSection } from "../modules/section/IndexSideSection";
import { FaCode } from "react-icons/fa";
import { MdContentPaste, MdOutlineFeaturedPlayList } from "react-icons/md";

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
        <Accordion>
          <Flex direction="column" justify="space-between">
            <Flex direction="column" justify="space-evenly">
              <IndexSideSection
                lists={languages}
                title="Language"
                icon={FaCode}
                color="green.400"
              />
              <IndexSideSection
                lists={frameworks}
                title="Framework"
                icon={MdContentPaste}
                color="orange.400"
              />
              <IndexSideSection
                lists={features}
                title="Features"
                icon={MdOutlineFeaturedPlayList}
                color="purple.400"
              />
            </Flex>
          </Flex>
        </Accordion>
      </Flex>
      <Center my="10" mr="8">
        <Divider orientation="vertical" />
      </Center>
    </>
  );
};
