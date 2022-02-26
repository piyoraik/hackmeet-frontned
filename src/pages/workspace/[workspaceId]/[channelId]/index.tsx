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
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useCallback, useState } from "react";
import { useSubscription } from "@apollo/client";
import { HiOutlinePaperAirplane } from "react-icons/hi";

interface Props {
  channel: Channel;
  workspace: Workspace;
}

const ChannelIndex: NextPage<Props> = ({ channel, workspace }) => {
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const { data, error, loading } = useSubscription(SUBSCRIPTION_MESSAGE);
  console.log(data, error, loading);

  const submitHandler = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const accessToken = await getAccessTokenSilently({});
      const params = {
        params: { channelId: channel.id, message },
      };

      const res = await mutationGraphql(
        CREATE_CHANNEL_MESSAGE,
        params,
        accessToken
      );

      console.log(res);
    },
    [channel.id, getAccessTokenSilently, message]
  );

  return (
    <Flex direction="row" justify="center">
      <SideNavIndex>
        <ChannelMenu channels={workspace.channels} workspaceId={workspace.id} />
      </SideNavIndex>
      <Box
        flex="1"
        w="100%"
        h="calc(100vh - 300px)"
        boxShadow="lg"
        rounded="xl"
        border="1px"
        borderColor="gray.50"
      >
        <Heading>aaaaa</Heading>
        <Box>
          {channel.channelMessages.map((message, idx) => (
            <Flex justify="flex-end" key={idx}>
              <Box>
                <Image
                  src={message.user.picture}
                  alt={message.user.nickname}
                  boxSize="40px"
                />
              </Box>
              <Box>
                <Box>{message.user.nickname}</Box>
                <Box>{message.message}</Box>
              </Box>
            </Flex>
          ))}
          <Flex>
            <Box>
              <Image
                src="https://hackmeet.s3.ap-northeast-1.amazonaws.com/twitter%7C1097467888758214656-20220224130249.png"
                alt="test"
                boxSize="80px"
              />
            </Box>
            <Box>
              <Box>aaaa</Box>
              <Box>bbbb</Box>
            </Box>
          </Flex>
        </Box>
        <Box mt="10">
          <form onSubmit={submitHandler}>
            <FormControl isRequired display="flex">
              <Input
                placeholder={`${channel.name}へメッセージ`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                w="95%"
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

  return {
    props: {
      workspace: workspace.data.findOneWorkspace,
      channel: channel.data.findOneChannel,
    },
  };
};

export default ChannelIndex;
