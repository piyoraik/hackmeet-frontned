import { recruitUseSelectStateSelector } from "@/recoil/selector/recruitUseSelectState.selector";
import { Flex, Heading, Icon, Center, Image, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export const Title: React.VFC = () => {
  const [selector, setSelector] = useRecoilState(recruitUseSelectStateSelector);
  const router = useRouter();

  const routerPushHandler = () => {
    setSelector([]);
    router.push("/");
  };

  return (
    <chakra.button my="10" onClick={() => routerPushHandler()}>
      <Image src="/logo.png" alt="HackMeet" boxSize="90%" />
    </chakra.button>
  );
};
