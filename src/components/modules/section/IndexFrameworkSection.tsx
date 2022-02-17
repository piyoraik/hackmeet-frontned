import { TechIcon } from "@/components/atoms/TechIcon";
import { Framework } from "@/types/framework.type";
import { Icon, List, ListItem } from "@chakra-ui/react";
import { MdContentPaste } from "react-icons/md";
import { SearchSection } from "@/components/modules/SearchSection";

interface Props {
  frameworks: Framework[];
}

export const IndexFrameworkSection: React.FC<Props> = ({ frameworks }) => {
  return (
    <SearchSection
      title="Framework"
      icon={<Icon as={MdContentPaste} color="orange.400" />}
    >
      <List spacing={3} pl="5" fontSize="xl" mt="3">
        {frameworks.map((framework, idx) => (
          <ListItem key={idx}>
            <TechIcon svg={framework.icon} setColor={framework.color} />
            {framework.name}
          </ListItem>
        ))}
      </List>
    </SearchSection>
  );
};
