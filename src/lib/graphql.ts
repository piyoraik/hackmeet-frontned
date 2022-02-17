import {
  FetchPolicy,
  OperationVariables,
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { DocumentNode } from "graphql";

export const httpHeader = (token?: string) => {
  return createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND}/graphql`,
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

export const fetchGraphql = async <T>(
  query: DocumentNode,
  fetchPolicy: FetchPolicy,
  variables?: OperationVariables,
  token?: string
) => {
  const link = httpHeader(token);
  const { data, error, loading } = await client(link).query<T>({
    query,
    fetchPolicy,
    variables,
  });

  return {
    data,
    error,
    loading,
  };
};

export const mutationGraphql = async <T>(
  mutation: DocumentNode,
  variables: OperationVariables,
  token?: string
) => {
  try {
    const link = httpHeader(token);
    const { data } = await client(link).mutate<T>({
      mutation,
      variables,
    });
    if (!data) throw Error("GraphQL Error");
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw Error("予期せぬエラー");
  }
};
