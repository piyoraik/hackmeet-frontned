import { Card } from "@/components/atoms/Card";
import { CREATE_CHANNEL } from "@/graphql/channel.graphql";
import { mutationGraphql } from "@/lib/graphql";
import { Channel } from "@/types/channel.type";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
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
import { useState } from "react";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";
import { MdCable } from "react-icons/md";

interface Props {
  channels: Channel[];
  workspaceId: string;
}

export const ChannelMenu: React.VFC<Props> = ({ channels, workspaceId }) => {
  const router = useRouter();
  const [inputChannel, setInputChannel] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAccessTokenSilently } = useAuth0();

  const addHandler = async (e: React.SyntheticEvent) => {
    console.log("====");
    e.preventDefault();
    const accessToken = await getAccessTokenSilently({});
    const params = {
      params: {
        workspaceId,
        name: inputChannel,
        isPublic: false,
      },
    };
    const res = await mutationGraphql<CREATE_CHANNEL>(
      CREATE_CHANNEL,
      params,
      accessToken
    );
    onClose();
    setInputChannel("");
    router.push(`/workspace/${workspaceId}/${res.createChannel.id}`);
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
          <ModalBody>
            <form onSubmit={addHandler}>
              <FormControl>
                <FormLabel htmlFor="channel">Input Channel Name</FormLabel>
                <Input
                  id="channel"
                  type="text"
                  value={inputChannel}
                  onChange={(e) => setInputChannel(e.target.value)}
                />
              </FormControl>
              <Button
                mt="2"
                w="full"
                leftIcon={<IoIosAdd />}
                colorScheme="blue"
                variant="solid"
                type="submit"
              >
                Add Channel
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
