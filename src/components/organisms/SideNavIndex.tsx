import { Accordion, Box } from "@chakra-ui/react";
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
    <Box w="300px">
      <Title />
      <Box w="full">
        <Accordion defaultIndex={[0]} allowMultiple>
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
        </Accordion>
      </Box>
    </Box>
  );
};
