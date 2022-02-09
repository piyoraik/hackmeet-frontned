import { getAccessToken, getUser } from "@/lib/auth0";
import { Flex } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";

const SingUp: NextPage = () => {
  return (
    <>
      <Flex direction="row" justify="center"></Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const accessToken = await getAccessToken();
  const user = await getUser(
    "twitter|1097467888758214656",
    accessToken.access_token
  );
  console.log(user);
  return {
    props: {
      data: true,
    },
  };
};

export default SingUp;
