import { Box, Flex, Icon, List, ListItem, Select } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Card } from "@/components/atoms/Card";
import { TechIcon } from "@/components/atoms/TechIcon";
import { MdDelete } from "react-icons/md";
import { SectionItem } from "@/types/sectionItem.type";

interface Props {
  useLists: SectionItem[];
  setFn: Dispatch<SetStateAction<SectionItem[]>>;
  lists: SectionItem[];
}

const AddSelectCard: React.VFC<Props> = ({ useLists, setFn, lists }) => {
  const addHandler = (
    e: ChangeEvent<HTMLSelectElement>,
    setFn: Dispatch<SetStateAction<SectionItem[]>>
  ) => {
    const id = e.target.value;
    if (useLists.some((l) => l.id === id || useLists.length >= 5)) return;
    const list = lists.filter((l) => l.id === id);
    setFn([...useLists, list[0]]);
  };

  const deleteHandler = (id: string) => {
    const newLists = useLists.filter((list) => list.id !== id);
    setFn(newLists);
  };

  return (
    <Card title="Language">
      <Flex direction="column" width="100%">
        <Flex
          width="80%"
          mx="auto"
          boxShadow="md"
          rounded="xl"
          border="1px"
          borderColor="gray.50"
          justify="center"
          justifyItems="center"
          p="3"
        >
          <List spacing={3}>
            {useLists.map((useList, idx) => (
              <ListItem key={idx}>
                <Flex>
                  <Box>
                    <TechIcon svg={useList.icon} setColor={useList.color} />
                    {useList.name}
                  </Box>
                  <Box onClick={() => deleteHandler(useList.id)}>
                    <Icon as={MdDelete} color="red.300" boxSize="6" />
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex width="80%" mx="auto" mt="4">
          <Select
            placeholder="Select Language"
            size="md"
            onChange={(e) => addHandler(e, setFn)}
          >
            {lists.map((list, idx) => (
              <option value={list.id} key={idx}>
                {list.name}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AddSelectCard;
