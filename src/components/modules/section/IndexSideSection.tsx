import {
  Icon,
  List,
  ListItem,
  Box,
  Flex,
  Text,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
} from "@chakra-ui/react";
import { TechIcon } from "@/components/atoms/TechIcon";
import { SideBarIndex } from "@/types/sideBar";
import { IconType } from "react-icons";

interface Props {
  lists: SideBarIndex[];
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
        <AccordionButton>
          <Flex>
            <Icon as={icon} color={color} />
            <Text ml='2'>{title}</Text>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <List spacing={3} pl="5" fontSize="xl" mt="3">
            {lists.map((list, idx) => (
              <ListItem key={idx}>
                <TechIcon svg={list.icon} setColor={list.color} />
                {list.name}
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Box>
  );
};
