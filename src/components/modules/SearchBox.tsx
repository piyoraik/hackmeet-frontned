import { Input } from "@chakra-ui/react";
import { NextPage } from "next";

const SearchBox: NextPage = () => {
  return (
    <Input
      w="30%"
      type="text"
      placeholder="Search"
      color="blue.800"
      backgroundColor="blue.50"
      rounded="2xl"
      border="0"
      _focus={{
        backgroundColor: "blue.200",
        outline: "none",
      }}
    />
  );
};

export default SearchBox;
