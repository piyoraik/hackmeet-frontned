import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Emoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Dispatch, SetStateAction } from "react";
import Card from "../atoms/Card";

interface Props {
  name: string;
  setFn: Dispatch<SetStateAction<string>>;
}

const ThumbnailCard: NextPage<Props> = ({ name, setFn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Card title="Thumbnail">
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
          <Emoji emoji={name} size={52} />
        </Flex>
        <Flex width="80%" mx="auto" mt="4">
          <Button width="100%" onClick={onOpen}>
            Select Thumbnail
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Thumbnail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Picker onClick={(emoji) => setFn(emoji.id!)} />
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
};

export default ThumbnailCard;
