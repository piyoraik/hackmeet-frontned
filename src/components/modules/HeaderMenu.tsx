import { FIND_USER, FIND_USERID } from "@/graphql/user.grpahql";
import { fetchGraphql } from "@/lib/graphql";
import { userStateSelector } from "@/recoil/selector/userState.selector";
import {
  Box,
  chakra,
  Icon,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Link as CLink,
} from "@chakra-ui/react";
import router from "next/router";
import { memo, useEffect } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

// eslint-disable-next-line react/display-name
export const HeaderMenu = memo(() => {
  const { isLoading, loginWithRedirect, logout, user } = useAuth0();
  const [loginUser, setLoginUser] = useRecoilState(userStateSelector);

  useEffect(() => {
    if (user === undefined) return;
    const fetchUser = async () => {
      const res = await fetchGraphql<FIND_USER>(FIND_USERID, "network-only", {
        userId: user.sub,
      })
        .then((res) => {
          setLoginUser(res.data.findUserId);
        })
        .catch((err) => {
          console.error(err);
        });
      return res;
    };
    fetchUser();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && !!loginUser ? (
        <>
          <Box boxSize="40px" onClick={() => router.push("/wanted/new")}>
            <chakra.button>
              <Icon as={BsPlusSquare} boxSize="40px" color="gray.600" />
            </chakra.button>
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={
                <Image
                  boxSize="40px"
                  src={loginUser.picture}
                  alt={loginUser.nickname}
                  border="1px"
                  borderRadius="md"
                  borderColor="gray.600"
                />
              }
              variant="outline"
            />
            <MenuList>
              <Link href={`/user/${loginUser.id}`} passHref>
                <MenuItem>{loginUser.nickname}</MenuItem>
              </Link>
              <Link href={`/user/edit`} passHref>
                <MenuItem icon={<GrUpdate />}>Update</MenuItem>
              </Link>
              <MenuItem onClick={() => logout()} icon={<RiLogoutBoxRLine />}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
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
    </>
  );
});
