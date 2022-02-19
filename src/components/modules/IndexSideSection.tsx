import {
  Icon,
  List,
  ListItem,
  Box,
  Text,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
} from "@chakra-ui/react";
import { TechIcon } from "@/components/atoms/TechIcon";
import { SectionItem } from "@/types/sectionItem.type";
import { IconType } from "react-icons";

interface Props {
  lists: SectionItem[];
  title: string;
  icon: IconType;
  color: string;
}

export const IndexSideSection: React.FC<Props> = ({
  lists,
  title,
  icon,
  color,
}) => {
  return (
    <Box mb="8">
      <AccordionItem>
        <AccordionButton display="flex" flexDirection="row">
          <Icon as={icon} color={color} boxSize="6" />
          <Text ml="4" fontSize="xl">
            {title}
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <List spacing={3} pl="5" fontSize="xl" mt="3">
            {lists.map((list, idx) => (
              <ListItem display="flex" key={idx}>
                <TechIcon svg={list.icon} setColor={list.color} />
                <Box ml="4">{list.name}</Box>
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Box>
  );
};
