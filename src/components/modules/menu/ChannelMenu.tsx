import { Card } from "@/components/atoms/Card";
import { Channel } from "@/types/channel.type";
import {
  Box,
  chakra,
  Flex,
  Icon,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdCable } from "react-icons/md";

interface Props {
  channels: Channel[];
  workspaceId: string;
}

export const ChannelMenu: React.VFC<Props> = ({ channels, workspaceId }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
  };

  return (
    <>
      <Card title="Channel">
        <Box>
          <List spacing={3} textAlign="center">
            {channels.map((channel, idx) => (
              <ListItem key={idx}>
                <chakra.button
                  onClick={() =>
                    router.push(`/workspace/${workspaceId}/${channel.id}`)
                  }
                >
                  <ListIcon as={MdCable} color="blue.600" />
                  {channel.name}
                </chakra.button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Flex justify="center" mt="8" cursor="pointer" onClick={onOpen}>
          <Icon as={IoIosAddCircleOutline} />
          <Text ml="2">Add Channel</Text>
        </Flex>
      </Card>
      <Modal
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent pb={5}>
          <ModalHeader>Add Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
