import UserCard from "@/components/modules/card/UserCard";
import { Header } from "@/components/organisms/Header";
import { FIND_USER_PRIMAERY, FIND_USER_PRIMARY } from "@/graphql/user.grpahql";
import { fetchGraphql } from "@/lib/graphqlFetch";
import { User } from "@/types/user.type";
import { Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";
import { GetSession } from "@/lib/getSession";

interface Props {
  user: User;
}

const UserShow: NextPage<Props> = ({ user }) => {
  return (
    <Box width="80%" mx="auto">
      <Header />
      <UserCard user={user} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = params?.userId;
  if (!userId) throw Error("UserId Not Found");

  const { data, loading, error } = await fetchGraphql<FIND_USER_PRIMARY>(
    FIND_USER_PRIMAERY,
    "network-only",
    {
      id: userId,
    }
  );

  if (!!error) throw Error("GraphQL Error");
  return {
    props: {
      user: data.findUserPrimaryId,
    },
  };
};

export default UserShow;
