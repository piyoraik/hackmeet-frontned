import { Icon, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { SearchSection } from "@/components/modules/SearchSection";
import { Feature } from "@/types/feature.type";
import { TechIcon } from "@/components/atoms/TechIcon";

interface Props {
  features: Feature[];
}
export const IndexFeatureSection: React.FC<Props> = ({ features }) => {
  return (
    <SearchSection
      title="Features"
      icon={<Icon as={MdOutlineFeaturedPlayList} color="purple.400" />}
    >
      <List spacing={3} pl="5" fontSize="xl" mt="3">
        {features.map((feature, idx) => (
          <ListItem key={idx}>
            <TechIcon svg={feature.icon} setColor={feature.color} />
            {feature.name}
          </ListItem>
        ))}
      </List>
    </SearchSection>
  );
};
