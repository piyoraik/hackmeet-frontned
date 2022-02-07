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
import Title from "../modules/Title";
import SearchSection from "../modules/SearchSection";
import { FaAngular, FaCode, FaVuejs } from "react-icons/fa";
import { MdContentPaste, MdOutlineFeaturedPlayList } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { Feature } from "../../types/feature.type";
import { Framework } from "../../types/framework.type";
import { Language } from "../../types/language.type";
import { GrReactjs } from "react-icons/gr";

interface Props {
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

const SideNavIndex: NextPage<Props> = ({ languages, frameworks, features }) => {
  return (
    <>
      <Flex w="18%" direction="column" align="center">
        <Title />
        <Flex direction="column" justify="space-between">
          <Flex direction="column" justify="space-evenly">
            <SearchSection
              title="Position"
              icon={<Icon as={GiPositionMarker} color="red.400" />}
            >
              <List spacing={3} pl="5" fontSize="xl" mt="3">
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
              </List>
            </SearchSection>
            <SearchSection
              title="Language"
              icon={<Icon as={FaCode} color="green.400" />}
            >
              <List spacing={3} pl="5" fontSize="xl" mt="3">
                {languages.map((language, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={GrReactjs} color="blue.300" />
                    {language.name}
                  </ListItem>
                ))}
              </List>
            </SearchSection>
            <SearchSection
              title="Framework"
              icon={<Icon as={MdContentPaste} color="orange.400" />}
            >
              <List spacing={3} pl="5" fontSize="xl" mt="3">
                {frameworks.map((framework, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={GrReactjs} color="blue.300" />
                    {framework.name}
                  </ListItem>
                ))}
              </List>
            </SearchSection>
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

export default SideNavIndex;
