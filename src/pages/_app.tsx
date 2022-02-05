import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Head>
          <title>My page title</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Box maxWidth="1656px" mx="auto">
          <a href="/api/auth/login">Login</a>
          <a href="/api/auth/logout">Logout</a>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
