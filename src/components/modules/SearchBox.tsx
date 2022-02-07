import { Input } from "@chakra-ui/react";
import { NextPage } from "next";

const SearchBox: NextPage = () => {
  return (
    <Input
      w="100%"
      type="text"
      placeholder="Keyword..."
      color="blue.800"
      backgroundColor="gray.50"
      rounded="2xl"
      border="1px"
      _focus={{
        outline: "none",
      }}
    />
  );
};

export default SearchBox;
