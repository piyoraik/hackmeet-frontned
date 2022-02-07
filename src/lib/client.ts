import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:9000";

export const httpHeader = (token?: string) => {
  return createHttpLink({
    uri: `${BACKEND}/graphql`,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
};

export const client = (link: ApolloLink) => {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};
