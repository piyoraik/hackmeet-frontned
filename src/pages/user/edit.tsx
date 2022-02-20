import { NextPage } from "next";
import { UPDATE_USER, UPDATE_USER_TYPE } from "@/graphql/user.grpahql";
import { User } from "@/types/user.type";
import { Header } from "@/components/organisms/Header";
import {
  Box,
  Flex,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import { S3Upload } from "@/lib/s3Upload";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { userStateSelector } from "@/recoil/selector/userState.selector";
import { useRecoilState } from "recoil";
import { mutationGraphql } from "@/lib/graphql";

interface Props {
  user: User;
}

const UserEdit: NextPage<Props> = () => {
  const router = useRouter();

  const { getAccessTokenSilently } = useAuth0();
  const [loginUser, setLoginUser] = useRecoilState(userStateSelector);
  const [nickName, setNickName] = useState(loginUser?.nickname);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState("");

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setPreview(window.URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let fileName = "";
      if (image) {
        const fileType = image.name.split(".").pop();
        const today = new Date()
          .toISOString()
          .replace(/[^\d]/g, "")
          .slice(0, 14);
        fileName = `${loginUser?.userId}-${today}.${fileType}`;
        await S3Upload(image, fileName);
      }

      const accessToken = await getAccessTokenSilently({});
      const pamras = {
        param: {
          nickname: nickName,
          picture:
            fileName !== ""
              ? `${process.env.NEXT_PUBLIC_S3_URL}${fileName}`
              : loginUser?.picture,
        },
      };
      const res = await mutationGraphql<UPDATE_USER_TYPE>(
        UPDATE_USER,
        pamras,
        accessToken
      );
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex direction="column">
      <Heading mt="2" mb="5" mx="3" fontSize="2xl">
        {loginUser?.nickname} is Update
      </Heading>
      <form onSubmit={submitHandler}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="nickname">NickName</FormLabel>
            <Input
              type="text"
              id="nickname"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="picture">Picture</FormLabel>
            <Flex>
              <Box>
                {preview ? (
                  <Image src={preview} alt="プレビュー" boxSize="80px" />
                ) : (
                  <Image
                    src={loginUser?.picture}
                    alt="プレビュー"
                    boxSize="80px"
                  />
                )}
              </Box>
              <Box>
                <Input
                  type="file"
                  id="picture"
                  onChange={(e) => handleChangeFile(e)}
                />
              </Box>
            </Flex>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Update User
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default UserEdit;
