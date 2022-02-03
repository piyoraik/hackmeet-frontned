import { Flex, List, ListItem, ListIcon, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Select, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { NextPage } from "next";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { MdCheckCircle } from "react-icons/md";
import { Framework } from "../../types/framework.type";
import Card from "../atoms/Card";

interface Props {
  useFrameworkList: Framework[]
  setFn: Dispatch<SetStateAction<Framework[]>>
  frameworks: Framework[]
}

const FrameworkCard: NextPage<Props> = ({useFrameworkList, setFn, frameworks}) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
     try {
       const frameworkValue = e.target.value;
       const frameworkArray = frameworkValue.split(",");
       if (useFrameworkList.length >= 5) {
         throw Error("登録できるのは最大5個までです。");
       }
       const framework = useFrameworkList.some(
         (framework) => framework.id === frameworkArray[0]
       );
       if (frameworkValue === "" || framework) {
         throw Error("既に登録済みです。");
       }
       setFn([
         ...useFrameworkList,
         { id: frameworkArray[0], name: frameworkArray[1] },
       ]);
     } catch (err) {
       if (err instanceof Error) {
         return err.message;
       }
       throw err;
     }
   };

  return (
    <Card title="framework">
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
            {useFrameworkList.map((framework, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {framework.name}
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex width="80%" mx="auto" mt="4">
          <Button width="100%" onClick={onOpen}>
            Select framework
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select framework</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <List spacing={3}>
                {useFrameworkList.map((framework, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {framework.name}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Select
              placeholder="Select framework"
              size="md"
              onChange={(e) => changeHandler(e)}
            >
              {frameworks.map((framework, idx) => (
                <option value={`${framework.id},${framework.name}`} key={idx}>
                  {framework.name}
                </option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default FrameworkCard