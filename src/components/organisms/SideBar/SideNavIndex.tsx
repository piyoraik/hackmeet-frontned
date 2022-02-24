import { Box } from "@chakra-ui/react";
import { Title } from "@/components/modules/Title";
import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { AccordionSectionMenu } from "@/components/organisms/AccordionSectionMenu";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const SideNavIndex: React.VFC<Props> = ({ children }) => {
  return (
    <Box w="300px" display={{ base: "none", md: "block" }}>
      {children}
    </Box>
  );
};
