import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { Title } from "./Title";

interface Props {
  children: ReactNode;
}

export const DrawerMenu: React.FC<Props> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Box display={{ base: "block", md: "none" }}>
      <Button
        ref={btnRef}
        onClick={onOpen}
        position="fixed"
        right="50px"
        bottom="50px"
      >
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Title />
            </DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};
