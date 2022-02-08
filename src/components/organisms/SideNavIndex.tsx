import {
  Center,
  Divider,
  Flex,
  Icon,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Title } from "@/components/modules/Title";
import { SearchSection } from "@/components/modules/SearchSection";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { GrReactjs } from "react-icons/gr";
import { LanguageSection } from "../modules/section/LanguageSection";
import { FrameworkSection } from "../modules/section/FrameworkSection";

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
            <SearchSection
              title="Features"
              icon={<Icon as={MdOutlineFeaturedPlayList} color="purple.400" />}
            >
              <List spacing={3} pl="5" fontSize="xl" mt="3">
                {features.map((feature, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={GrReactjs} color="blue.300" />
                    {feature.name}
                  </ListItem>
                ))}
              </List>
            </SearchSection>
          </Flex>
        </Flex>
      </Flex>
      <Center my="10" mr="8">
        <Divider orientation="vertical" />
      </Center>
    </>
  );
};
