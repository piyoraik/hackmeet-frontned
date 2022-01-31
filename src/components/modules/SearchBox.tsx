import { Input } from "@chakra-ui/react";
import { NextPage } from "next";

const SearchBox: NextPage = () => {
  return (
    <Input
      w="100%"
      type="text"
      placeholder="Keyword..."
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
