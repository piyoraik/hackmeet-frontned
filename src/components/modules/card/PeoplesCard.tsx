import { Card } from "@/components/atoms/Card";
import { Flex, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  peoples: string;
  setFn: Dispatch<SetStateAction<string>>;
}

export const PeoplesCard: React.VFC<Props> = ({ peoples, setFn }) => {
  return (
    <Card title="Peoples">
      <Flex direction="column" width="100%">
        <Flex
          width="80%"
          mx="auto"
          boxShadow="md"
          rounded="xl"
          border="1px"
          borderColor="gray.50"
          justify="center"
          justifyItems="center"
          p="3"
        >
          <Input
            placeholder="Basic usage"
            type="number"
            textAlign="center"
            _focus={{
              outline: "none",
            }}
            value={peoples}
            onChange={(e) => setFn(e.target.value)}
          />
        </Flex>
      </Flex>
    </Card>
  );
};
