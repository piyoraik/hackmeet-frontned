import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        redirectUri={process.env.NEXT_PUBLIC_BASE_URL}
        audience={process.env.NEXT_PUBLIC_IDENTIFIRE!}
        scope="read:current_user update:current_user_metadata"
      >
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
      </Auth0Provider>
    </RecoilRoot>
  );
}

export default MyApp;
