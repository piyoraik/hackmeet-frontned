import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { Accordion } from "@chakra-ui/react";
import { FaCode } from "react-icons/fa";
import { MdContentPaste, MdOutlineFeaturedPlayList } from "react-icons/md";
import { IndexSideSection } from "./IndexSideSection";

interface Props {
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

export const AccordionMenu: React.VFC<Props> = ({
  languages,
  frameworks,
  features,
}) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple w="80%" mx="auto">
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
  );
};
