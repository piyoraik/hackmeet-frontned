import { Flex, Image, Box, Heading, Text } from "@chakra-ui/react";
import { User } from "@/types/user.type";

interface Props {
  user: User;
}

const UserCard: React.VFC<Props> = ({ user }) => {
  return (
    <Flex w="full" backgroundColor="blue.50" rounded="xl" boxShadow="md" mb="2">
      <Flex align="center" justifyContent="center" w="20%">
        <Image
          borderRadius="full"
          boxSize="60px"
          src={user.picture}
          alt={user.nickname}
        />
      </Flex>
      <Box w="70%" backgroundPosition="right" mr="4">
        <Flex align="center" my="5">
          <Heading pr="4" fontSize="2xl" color="gray.600">
            {user.nickname}
          </Heading>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserCard;
