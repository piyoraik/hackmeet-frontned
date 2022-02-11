import { Flex, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { SearchBox } from "@/components/modules/SearchBox";
import { useAuth0 } from "@auth0/auth0-react";
import { ThreeDots } from "@agney/react-loading";
import { HeaderMenu } from "./HeaderMenu";

export const HeaderContent: NextPage = () => {
  const { isLoading } = useAuth0();

  return (
    <>
      <Flex
        direction="row"
        justify="space-around"
        my="10"
        align="center"
        width="30%"
      >
        <Box>
          <SearchBox />
        </Box>
        {isLoading ? (
          <Box>
            <ThreeDots width="50" color="#3984c6" />
          </Box>
        ) : (
          <HeaderMenu />
        )}
      </Flex>
    </>
  );
};
