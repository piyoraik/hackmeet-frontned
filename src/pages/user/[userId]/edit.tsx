import { Header } from "@/components/organisms/Header";
import { FIND_USER_PRIMAERY, FIND_USER_PRIMARY } from "@/graphql/user.grpahql";
import { fetchGraphql } from "@/lib/graphqlFetch";
import { User } from "@/types/user.type";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";

interface Props {
  status: string;
  data: User;
}

const UserEdit: NextPage<Props> = ({ status, data }) => {
  const { user } = useAuth0();

  useEffect(() => {
    if (user?.sub === data.userId) {
      console.log(data);
    }
  }, []);

  return (
    <Box width="80%" mx="auto">
      <Header />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const userId = params?.userId;
    const user = await fetchGraphql<FIND_USER_PRIMARY>(
      FIND_USER_PRIMAERY,
      "network-only",
      {
        id: userId,
      }
    );
    console.log(user);

    return {
      props: {
        status: "ok",
        data: user.data.findUserPrimaryId,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: {
          status: err.message,
          data: null,
        },
      };
    }
    throw err;
  }
};

export default UserEdit;
