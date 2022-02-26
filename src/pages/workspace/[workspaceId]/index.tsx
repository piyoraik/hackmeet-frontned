import { ChannelMenu } from "@/components/modules/menu/ChannelMenu";
import { SideNavIndex } from "@/components/organisms/SideBar/SideNavIndex";
import { WORKSPACE_FINDID_QUERY } from "@/graphql/workspace.graphql";
import { fetchGraphql } from "@/lib/graphql";
import { Workspace } from "@/types/workspace.type";
import { Box, Center, Divider, Flex } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  workspace: Workspace;
}

const WorkspaceIndex: NextPage<Props> = ({ workspace }) => {
  return (
    <Flex direction="row" justify="center">
      <SideNavIndex>
        <ChannelMenu channels={workspace.channels} workspaceId={workspace.id} />
      </SideNavIndex>
      <Box flex="1" w="100%" h="100vh">
        Workspace
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const workspaceId = params?.workspaceId;
  if (!workspaceId) throw Error("WorkspaceId Not Found");

  const { data, loading, error } = await fetchGraphql<WORKSPACE_FINDID_QUERY>(
    WORKSPACE_FINDID_QUERY,
    "network-only",
    {
      id: workspaceId,
    }
  );

  if (!!error) throw Error("GraphQL Error");

  return {
    props: {
      workspace: data.findOneWorkspace,
    },
  };
};

export default WorkspaceIndex;
