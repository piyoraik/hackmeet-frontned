import UserCard from "@/components/modules/card/UserCard";
import { DrawerMenu } from "@/components/modules/DrawerMenu";
import { FIND_USER_PRIMAERY, FIND_USER_PRIMARY } from "@/graphql/user.grpahql";
import { fetchGraphql } from "@/lib/graphql";
import { User } from "@/types/user.type";
import { Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  user: User;
}

const UserShow: NextPage<Props> = ({ user }) => {
  return (
    <>
      <UserCard user={user} />
    </>
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
