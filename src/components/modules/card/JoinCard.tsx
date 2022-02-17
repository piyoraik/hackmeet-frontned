import { Card } from "@/components/atoms/Card";
import { CreateJoinType, CREATE_JOIN } from "@/graphql/join.graphql";
import { client, httpHeader } from "@/lib/client";
import { recruitDetailStateSelector } from "@/recoil/selector/recruitDetailState.selector";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export const JoinCard: React.VFC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getAccessTokenSilently } = useAuth0();
  const [recruit, setRecruit] = useRecoilState(recruitDetailStateSelector);

  const joinHandler = async () => {
    try {
      const accessToken = await getAccessTokenSilently({});
      const link = httpHeader(accessToken);
      const res = await client(link).mutate<CreateJoinType>({
        mutation: CREATE_JOIN,
        variables: {
          param: {
            recruit: id,
          },
        },
      });
      // if (res.data?.createJ1oin)
      if (res !== undefined) {
        const { joins, ...r } = recruit;
        const joinMember = res.data?.createJoin.recruit.joins!;
        setRecruit({ ...r, joins: joinMember });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card title="Wanted Join!">
      <Flex direction="column" alignItems="center" w="100%">
        <Box m="4">
          <Text fontSize="xl">
            {recruit.joins.length}人 / {recruit.peoples}人
          </Text>
        </Box>
        <Button colorScheme="blue" width="80%" onClick={() => joinHandler()}>
          Join
        </Button>
      </Flex>
    </Card>
  );
};
