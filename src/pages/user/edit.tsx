import { GetServerSideProps, NextPage } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { FIND_USER, FIND_USERID, UPDATE_USER } from "@/graphql/user.grpahql";
import { fetchGraphql } from "@/lib/graphqlFetch";
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
import { httpHeader, client } from "@/lib/client";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  token: string;
  user: User;
}

const UserEdit: NextPage<Props> = ({ token, user }) => {
  const router = useRouter();

  const [nickName, setNickName] = useState(user.nickname);
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
        fileName = `${user.userId}-${today}.${fileType}`;
        await S3Upload(image, fileName);
      }

      const link = httpHeader(token);
      const res = await client(link).mutate({
        mutation: UPDATE_USER,
        variables: {
          param: {
            nickname: nickName,
            picture:
              fileName !== ""
                ? `${process.env.NEXT_PUBLIC_S3_URL}${fileName}`
                : user.picture,
          },
        },
      });
      if (res == undefined) throw Error("Error");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box width="80%" mx="auto">
      <Header />
      <Flex direction="column">
        <Heading mt="2" mb="5" mx="3" fontSize="2xl">
          {user.nickname} is Update
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
                    <Image src={user.picture} alt="プレビュー" boxSize="80px" />
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
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  if (!session) throw Error("No Session");
  const userId = session.user.sub;

  const { data, loading, error } = await fetchGraphql<FIND_USER>(
    FIND_USERID,
    "network-only",
    {
      userId,
    }
  );

  if (!!error) throw Error("GraphQL Error");
  return {
    props: {
      token: session.accessToken,
      user: data.findUserId,
    },
  };
};
export default UserEdit;
