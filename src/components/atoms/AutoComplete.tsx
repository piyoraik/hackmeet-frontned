import { Box } from "@chakra-ui/layout";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import { useState } from "react";

interface Props {
  lists: any[];
}

export const AutoComplete: React.VFC<Props> = ({ lists }) => {
  const options = [
    { value: "javascript", label: "Javascript" },
    { value: "chakra", label: "Chakra" },
    { value: "react", label: "React" },
    { value: "css", label: "CSS" },
  ];
  const [result, setResult] = useState<Option[]>([]);

  return (
    <Box maxW="md">
      <Autocomplete
        options={options}
        result={result}
        setResult={(options: Option[]) => setResult(options)}
        placeholder="Autocomplete"
      />
    </Box>
  );
};
