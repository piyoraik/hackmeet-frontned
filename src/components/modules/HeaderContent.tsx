import { Flex, Box, chakra, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import router from "next/router";
import { SearchBox } from "@/components/modules/SearchBox";
import { BsPlusSquare } from "react-icons/bs";
import { AccountMenu } from "@/components/modules/AccountMenu";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogIn } from "react-icons/fi";

export const HeaderContent: NextPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      <Flex
        direction="row"
        justify="space-between"
        my="10"
        align="center"
        width="30%"
      >
        <Box>
          <SearchBox />
        </Box>
        {isAuthenticated && (
          <>
            <Box onClick={() => router.push("/wanted/new")}>
              <chakra.button>
                <BsPlusSquare size="2rem" />
              </chakra.button>
            </Box>
            <AccountMenu />
          </>
        )}
        {!isAuthenticated && (
          <>
            <Button
              onClick={() => loginWithRedirect()}
              leftIcon={<FiLogIn />}
              colorScheme="blue"
              variant="outline"
            >
              Login
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};