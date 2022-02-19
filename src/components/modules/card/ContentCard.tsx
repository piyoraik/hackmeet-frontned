import {
  Stack,
  Flex,
  Text,
  Image,
  Heading,
  Box,
  WrapItem,
} from "@chakra-ui/react";
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
    <Box
      p="6"
      onClick={() => router.push(`/wanted/${recruit.id}`)}
      boxShadow="xl"
      rounded="xl"
      gap={3}
      w={{ base: "100%", md: "47%" }}
    >
      <Box
        p="6"
        my="4"
        border="1px"
        rounded="md"
        borderColor="gray.200"
        textAlign="center"
      >
        <Emoji emoji={recruit.thumbnail} size={52} />
      </Box>
      <Box>
        <Box>
          <Heading color="gray.700" fontSize="lg" fontFamily="body" mb="2">
            {recruit.title}
          </Heading>
        </Box>
        <Flex gap={2} align="center">
          <Image
            borderRadius="full"
            boxSize="50px"
            src={recruit.user.picture}
            alt={recruit.user.nickname}
          />
          <Box fontSize="sm" whiteSpace="nowrap">
            <Text fontWeight="bold">{recruit.user.nickname}</Text>
            <Text color="gray.500">Aug 12, 2021 · 15min read</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
