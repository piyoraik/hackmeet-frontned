import {
  Box,
  Button,
  Flex,
  FormControl,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import { Language } from "../../types/language.type";
import Card from "../atoms/Card";

interface Props {
  useLanguageList: String[];
  setFn: Dispatch<SetStateAction<String[]>>;
  languages: Language[];
}

const LanguageCard: NextPage<Props> = ({
  useLanguageList,
  setFn,
  languages,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFn([...useLanguageList, e.target.value]);
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
        ></Flex>
        <Flex width="80%" mx="auto" mt="4">
          <Button width="100%" onClick={onOpen}>
            Select Language
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Language</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <List spacing={3}>
                {useLanguageList.map((language, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {language}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Select
              placeholder="Select Language"
              size="md"
              onChange={(e) => changeHandler(e)}
            >
              {languages.map((language, idx) => (
                <option value={language.id} key={idx}>
                  {language.name}
                </option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => setFn()}>
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default LanguageCard;
