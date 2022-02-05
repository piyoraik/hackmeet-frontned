import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND}/graphql`,
  cache: new InMemoryCache(),
});
