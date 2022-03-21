import UserCard from "@/components/modules/card/UserCard";
import { ChannelMenu } from "@/components/modules/menu/ChannelMenu";
import ContentDetail from "@/components/organisms/ContentDetail";
import { SideNavIndex } from "@/components/organisms/SideBar/SideNavIndex";
import { WORKSPACE_FINDID_QUERY } from "@/graphql/workspace.graphql";
import { fetchGraphql } from "@/lib/graphql";
import { markdownIt } from "@/lib/markdownIt";
import { recruitDetailStateSelector } from "@/recoil/selector/recruitDetailState.selector";
import { Workspace } from "@/types/workspace.type";
import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Prism from "prismjs";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

interface Props {
  workspace: Workspace;
}

const WorkspaceIndex: NextPage<Props> = ({ workspace }) => {
  const [recruit, setRecruit] = useRecoilState(recruitDetailStateSelector);

  useEffect(() => {
    console.log({ ...workspace.recruit });
    setRecruit({
      ...workspace.recruit!,
      content: markdownIt.render(workspace.recruit?.content!),
    });
    Prism.highlightAll();
  }, []);

  return (
    <Flex direction="row" justify="center">
      <Flex direction="column" align="center" w="30%">
        <ChannelMenu channels={workspace.channels} workspaceId={workspace.id} />
      </Flex>
      <Box w={{ base: "100%", md: "70%" }}>
        <UserCard user={workspace.recruit!.user} />
        <ContentDetail data={recruit!} />
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
