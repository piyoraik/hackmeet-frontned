import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

export const httpHeader = (token?: string) => {
  return createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND}/graphql`,
    // headers: {
    //   authorization: token ? `Bearer ${token}` : null,
    // },
  });
};

export const client = (link: ApolloLink) => {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};
