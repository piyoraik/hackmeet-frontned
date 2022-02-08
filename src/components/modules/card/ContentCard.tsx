import { Stack, Flex, Text, Avatar, Heading } from "@chakra-ui/react";
import { Emoji } from "emoji-mart";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Recruit } from "@/types/wanted.type";

interface Props {
  recruit: Recruit;
}

export const ContentCard: NextPage<Props> = ({ recruit }) => {
  const router = useRouter();

  return (
    <Flex
      py="6"
      w="full"
      maxW="350px"
      onClick={() => router.push(`/wanted/${recruit.id}`)}
    >
      <Flex
        direction="column"
        bg="white"
        boxShadow="xl"
        rounded="xl"
        p="6"
        overflow="hidden"
      >
        <Flex
          justify="center"
          p="6"
          my="4"
          border="1px"
          rounded="md"
          borderColor="gray.200"
        >
          <Emoji emoji={recruit.thumbnail} size={52} />
        </Flex>
        <Stack>
          <Heading color="gray.700" fontSize="lg" fontFamily="body">
            {recruit.title}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Chakra UI is a simple, modular and accessible component library that
            gives you the building blocks you need to build your React
            applications.
          </Text>
        </Stack>
        <Stack mt="6" direction="row" spacing="4" align="center">
          <Avatar src="https://gravatar.com/avatar/456e6f4841d1935a5383bd73a77a5a16?s=400&d=robohash&r=x" />
          <Stack direction="column" spacing="0" fontSize="sm">
            <Text fontWeight="bold">Daisuke</Text>
            <Text color="gray.500">Aug 12, 2021 · 15min read</Text>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};