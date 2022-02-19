import { IconProps, Icon, propNames } from "@chakra-ui/react";

interface Props {
  setColor: string;
  svg: string;
}

export const TechIcon: React.VFC<Props> = ({ svg, setColor }) => {
  return (
    <Icon viewBox="0 0 24 24" m={2} color={setColor} boxSize="5">
      <path fill="currentColor" d={svg} />
    </Icon>
  );
};
