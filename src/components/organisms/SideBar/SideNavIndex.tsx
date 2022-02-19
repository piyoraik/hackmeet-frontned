import { Box } from "@chakra-ui/react";
import { Title } from "@/components/modules/Title";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { AccordionMenu } from "@/components/modules/AccordionMenu";

interface Props {
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

export const SideNavIndex: React.VFC<Props> = ({
  languages,
  frameworks,
  features,
}) => {
  return (
    <Box w="300px" display={{ base: "none", md: "block" }}>
      <Title />
      <AccordionMenu
        languages={languages}
        frameworks={frameworks}
        features={features}
      />
    </Box>
  );
};
