import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

export const client = new ApolloClient({
  uri: "http://localhost:9000/graphql",
  cache: new InMemoryCache(),
});
