import { Flex, Image, Box, Heading, Text } from "@chakra-ui/react";
import { FaMapPin } from "react-icons/fa";
import {
  BsBuilding,
  BsLink45Deg,
  BsPencil,
  BsPeopleFill,
} from "react-icons/bs";
import { User } from "@/types/user.type";

interface Props {
  user: User;
}

const UserCard: React.VFC<Props> = ({ user }) => {
  return (
    <Flex
      w="full"
      h="160px"
      backgroundColor="blue.50"
      rounded="xl"
      boxShadow="md"
      mb="2"
    >
      <Flex align="center" justifyContent="center" w="20%">
        <Image
          borderRadius="full"
          boxSize="80px"
          src={user.picture}
          alt={user.nickname}
        />
      </Flex>
      <Box
        w="70%"
        backgroundPosition="right"
        backgroundSize="220px"
        backgroundRepeat="no-repeat"
        mr="4"
      >
        <Flex align="center" my="5">
          <Heading pr="4" fontSize="2xl" color="gray.600">
            {user.nickname}
          </Heading>
          <BsPencil color="#4D4D4D" />
        </Flex>
        <Flex mb="3" color="gray.500">
          <Flex align="center" w="35%">
            <FaMapPin />
            <Text pl="2">Osaka, Japan</Text>
          </Flex>
          <Flex align="center">
            <BsPeopleFill />
            <Text pl="2">1800+ connection</Text>
          </Flex>
        </Flex>
        <Flex mb="5" color="gray.500">
          <Flex align="center" w="35%">
            <BsLink45Deg />
            <Text pl="2">https://example.com</Text>
          </Flex>
          <Flex align="center">
            <BsBuilding />
            <Text pl="2">HogeHoge</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserCard;
