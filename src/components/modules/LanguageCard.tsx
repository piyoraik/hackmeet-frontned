import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Emoji, Picker } from "emoji-mart";
import { NextPage } from "next"
import Card from "../atoms/Card";

const LanguageCard: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        </Flex>
        <Flex width="80%" mx="auto" mt="4">
          <Button width="100%" onClick={onOpen}>
            Select Language
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Language</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

export default LanguageCard