import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { BsNewspaper, BsPlusSquare } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiDoorOpenLine, RiMailStarLine } from "react-icons/ri";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import { NextPage } from "next";
import Title from "../modules/Title";
import SearchSection from "../modules/SearchSection";
import { FaCode } from "react-icons/fa";
import { MdContentPaste, MdOutlineFeaturedPlayList } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";

const SideNav: NextPage = () => {
  return (
    <Flex w="20%" direction="column" align="center">
      <Title />
      <Flex direction="column" justify="space-between">
        <Flex direction="column" justify="space-evenly">
          <SearchSection
            title="Position"
            icon={<Icon as={GiPositionMarker} color="red.400" />}
          />
          <SearchSection
            title="Language"
            icon={<Icon as={FaCode} color="green.400" />}
          />
          <SearchSection
            title="Framework"
            icon={<Icon as={MdContentPaste} color="orange.400" />}
          />
          <SearchSection
            title="Contents"
            icon={<Icon as={MdContentPaste} color="skyblue" />}
          />
          <SearchSection
            title="Features"
            icon={<Icon as={MdOutlineFeaturedPlayList} color="purple.400" />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideNav;
