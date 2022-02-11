import { userStateSelector } from "@/recoil/selector/userState.selector";
import { useAuth0 } from "@auth0/auth0-react";
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
} from "@chakra-ui/react";
import router from "next/router";
import { BsPlusSquare } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRecoilState } from "recoil";

export const HeaderMenu = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [loinUser] = useRecoilState(userStateSelector);

  return (
    <>
      {isAuthenticated && loinUser !== null ? (
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
                  src={loinUser.picture}
                  alt={loinUser.nickname}
                  border="1px"
                  borderRadius="md"
                  borderColor="gray.600"
                />
              }
              variant="outline"
            />
            <MenuList>
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
};
