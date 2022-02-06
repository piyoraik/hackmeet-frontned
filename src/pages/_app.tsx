import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      redirectUri="http://localhost:3000"
    >
      <ChakraProvider>
        <Head>
          <title>My page title</title>
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
  );
}

export default MyApp;
