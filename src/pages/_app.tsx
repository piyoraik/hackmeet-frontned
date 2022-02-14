import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <UserProvider>
        <ChakraProvider>
          <Head>
            <title>HackMeet</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Box maxWidth="1656px" mx="auto">
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </UserProvider>
    </RecoilRoot>
  );
}

export default MyApp;
