import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:9000";

export const httpHeader = (token?: string) => {
  return createHttpLink({
    uri: `${BACKEND}/graphql`,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
};

export const client = (link: ApolloLink) =>
  new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
