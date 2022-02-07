import { useAuth0 } from "@auth0/auth0-react";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

const AccountMenu: NextPage = () => {
  const { logout } = useAuth0();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FaUser />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={() => logout()} icon={<RiLogoutBoxRLine />}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountMenu;
