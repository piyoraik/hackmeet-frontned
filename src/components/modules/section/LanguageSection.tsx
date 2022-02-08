import { Icon, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaCode } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { Language } from "@/types/language.type"
import { SearchSection } from "@/components/modules/SearchSection";

interface Props {
  languages: Language[]
}

export const LanguageSection: React.FC<Props> = ({languages}) => {
  return (
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
  );
};
