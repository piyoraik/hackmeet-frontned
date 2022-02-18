import { Icon, List, ListItem, ListIcon } from "@chakra-ui/react";
import { SearchSection } from "@/components/modules/SearchSection";
import { TechIcon } from "@/components/atoms/TechIcon";
import { SideBarIndex } from "@/types/sideBar";
import { IconType } from "react-icons";

interface Props {
  lists: SideBarIndex[];
  title: string
  icon: IconType;
  color: string;
}

export const IndexSideSection: React.FC<Props> = ({ lists, title, icon, color }) => {
  return (
    <SearchSection
      title={title}
      icon={<Icon as={icon} color={color} />}
    >
      <List spacing={3} pl="5" fontSize="xl" mt="3">
        {lists.map((list, idx) => (
          <ListItem key={idx}>
            <TechIcon svg={list.icon} setColor={list.color} />
            {list.name}
          </ListItem>
        ))}
      </List>
    </SearchSection>
  );
};
