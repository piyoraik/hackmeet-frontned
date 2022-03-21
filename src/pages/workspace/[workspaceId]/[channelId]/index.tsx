import { ChannelMenu } from "@/components/modules/menu/ChannelMenu";
import { SideNavIndex } from "@/components/organisms/SideBar/SideNavIndex";
import { CHANNEL_FINDONE_QUERY } from "@/graphql/channel.graphql";
import {
  CREATE_CHANNEL_MESSAGE,
  SUBSCRIPTION_MESSAGE,
} from "@/graphql/channelMessage.graphql";
import { WORKSPACE_FINDID_QUERY } from "@/graphql/workspace.graphql";
import { fetchGraphql, mutationGraphql } from "@/lib/graphql";
import { Channel } from "@/types/channel.type";
import { Workspace } from "@/types/workspace.type";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Flex,
  Box,
  Heading,
  Image,
  FormControl,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { ChannelMessage } from "@/types/channelMessage.type";
import { userStateSelector } from "@/recoil/selector/userState.selector";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import moment from "moment";

interface Props {
  channel: Channel;
  workspace: Workspace;
  channelMessages: ChannelMessage[];
}

const ChannelIndex: NextPage<Props> = ({
  channel,
  workspace,
  channelMessages,
}) => {
  const router = useRouter();
  const channelId = router.query.channelId;
  const [loginUser, setLoginUser] = useRecoilState(userStateSelector);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChannelMessage[]>(channelMessages);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { data, error, loading } =
    useSubscription<SUBSCRIPTION_MESSAGE>(SUBSCRIPTION_MESSAGE);

  useEffect(() => {
    if (!data?.createChannelMessage) return;
    setMessages([...messages, data.createChannelMessage]);
  }, [data]);

  useEffect(() => {
    const fetchChannelMessage = async () => {
      const channel = await fetchGraphql<CHANNEL_FINDONE_QUERY>(
        CHANNEL_FINDONE_QUERY,
        "network-only",
        {
          id: channelId,
        }
      ).then((res) => {
        return res.data.findOneChannel;
      });
      const { channelMessages, ...list } = channel;
      setMessages(channelMessages);
    };
    fetchChannelMessage();
  }, [channelId]);

  const submitHandler = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const accessToken = await getAccessTokenSilently({});
      const params = {
        params: { channelId: channel.id, message: inputMessage },
      };

      await mutationGraphql(CREATE_CHANNEL_MESSAGE, params, accessToken);
      setInputMessage("");
    },
    [channel.id, getAccessTokenSilently, inputMessage]
  );
  return (
    <Flex direction="row" justify="center">
      <Flex direction="column" align="center" w="30%">
        <ChannelMenu channels={workspace.channels} workspaceId={workspace.id} />
      </Flex>
      <Box
        w={{ base: "100%", md: "70%" }}
        h="calc(100vh - 300px)"
        boxShadow="lg"
        rounded="xl"
        border="1px"
        borderColor="gray.50"
        position="relative"
        p="6"
      >
        <Heading fontSize="2xl">{channel.name}</Heading>
        {messages.map((message, idx) => (
          <Box key={idx} p="10px">
            {loginUser?.userId === message.user.userId ? (
              <Flex justify="flex-end">
                <Box p="2">
                  <Text bg="blue.400" color="white" rounded="md" padding="10px">
                    {message.message}
                  </Text>
                  <Text>
                    {moment(message.createdAt).format("YYYY-MM-DD HH:mm")}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Flex>
                <Image
                  src={message.user.picture}
                  alt={message.user.nickname}
                  boxSize="40px"
                />
                <Box>
                  <Text>{message.user.nickname}</Text>
                  <Text bg="gray.400" color="white" rounded="md">
                    {message.message}
                  </Text>
                  <Text>
                    {moment(message.createdAt).format("YYYY-MM-DD HH:mm")}
                  </Text>
                </Box>
              </Flex>
            )}
          </Box>
        ))}
        <Box mt="10" position="absolute" bottom="3%" w="100%">
          <form onSubmit={submitHandler}>
            <FormControl isRequired display="flex">
              <Input
                placeholder={`${channel.name}へメッセージ`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                w="85%"
              />
              <Button
                colorScheme="teal"
                type="submit"
                leftIcon={<HiOutlinePaperAirplane />}
              >
                Send
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const workspaceId = params?.workspaceId;
  const channelId = params?.channelId;

  const workspace = await fetchGraphql<WORKSPACE_FINDID_QUERY>(
    WORKSPACE_FINDID_QUERY,
    "network-only",
    {
      id: workspaceId,
    }
  );

  const channel = await fetchGraphql<CHANNEL_FINDONE_QUERY>(
    CHANNEL_FINDONE_QUERY,
    "network-only",
    {
      id: channelId,
    }
  );

  const messages = channel.data.findOneChannel.channelMessages.slice();
  messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return {
    props: {
      workspace: workspace.data.findOneWorkspace,
      channel: channel.data.findOneChannel,
      channelMessages: messages,
    },
  };
};

export default ChannelIndex;
