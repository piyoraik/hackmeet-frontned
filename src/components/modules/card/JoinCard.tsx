import { Card } from "@/components/atoms/Card";
import { CreateJoinType, CREATE_JOIN } from "@/graphql/join.graphql";
import { mutationGraphql } from "@/lib/graphql";
import { recruitDetailStateSelector } from "@/recoil/selector/recruitDetailState.selector";
import { userStateSelector } from "@/recoil/selector/userState.selector";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export const JoinCard: React.VFC = () => {
  const router = useRouter();
  const { getAccessTokenSilently, user } = useAuth0();
  const [recruit, setRecruit] = useRecoilState(recruitDetailStateSelector);
  const [loginUser, setLoginUser] = useRecoilState(userStateSelector);

  const joinHandler = async () => {
    try {
      const accessToken = await getAccessTokenSilently({});

      const params = {
        param: {
          workspace: recruit.workspace.id,
        },
      };

      const res = await mutationGraphql<CreateJoinType>(
        CREATE_JOIN,
        params,
        accessToken
      );

      if (res !== undefined) {
        const { joins, ...r } = recruit;
        const joinMember = res.createJoin.workspace.joins!;
        setRecruit({ ...r, joins: joinMember });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const button = () => {
    if (loginUser?.userId === recruit.user.userId) {
      return (
        <Button
          colorScheme="blue"
          width="80%"
          onClick={() => router.push(`/workspace/${recruit.workspace.id}`)}
        >
          Go to Workspace
        </Button>
      );
    } else {
      return (
        <Button colorScheme="blue" width="80%" onClick={() => joinHandler()}>
          Join
        </Button>
      );
    }
  };

  return (
    <Card title="Wanted Join!">
      <Flex direction="column" alignItems="center" w="100%">
        <Box m="4">
          <Text fontSize="xl">
            {recruit.workspace.joins.length}人 / {recruit.peoples}人
          </Text>
        </Box>
        {button()}
      </Flex>
    </Card>
  );
};
