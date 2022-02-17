import { ListItem, Select } from "@chakra-ui/react";
import { FiAirplay } from "react-icons/fi";

interface Props {
  lists: any[];
  id: string;
}

export const Selector: React.VFC<Props> = ({ lists, id }) => {
  return (
    <Select id={id} placeholder="Select option" icon={<FiAirplay />}>
      {lists.map((list, idx) => (
        <option value={list.id} key={idx}>
          {list.name}
        </option>
      ))}
    </Select>
  );
};
