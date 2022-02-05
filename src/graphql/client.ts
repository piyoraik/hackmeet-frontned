import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

export const client = new ApolloClient({
  uri: `${process.env.BACKEND}/graphql`,
  cache: new InMemoryCache(),
});
