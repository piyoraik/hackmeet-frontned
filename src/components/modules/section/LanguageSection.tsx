import { Icon, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaCode } from "react-icons/fa";
import { Language } from "@/types/language.type"
import { SearchSection } from "@/components/modules/SearchSection";
import { TechIcon } from "@/components/atoms/TechIcon";

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
            <TechIcon svg={language.icon} setColor={language.color} />
            {language.name}
          </ListItem>
        ))}
      </List>
    </SearchSection>
  );
};
