import { Center, Divider, Flex, Icon } from "@chakra-ui/react";
import { NextPage } from "next";
import Title from "../modules/Title";
import SearchSection from "../modules/SearchSection";
import { FaCode } from "react-icons/fa";
import { MdContentPaste, MdOutlineFeaturedPlayList } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import JoinCard from "../modules/JoinCard";

const SideNavShow: NextPage = () => {
  return (
    <>
      <Flex w="33%" direction="column" align="center">
        <JoinCard />
      </Flex>
    </>
  );
};

export default SideNavShow;
