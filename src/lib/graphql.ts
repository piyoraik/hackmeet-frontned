import {
  FetchPolicy,
  OperationVariables,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { DocumentNode } from "graphql";

const createHttpLink = (token?: string) => {
  return new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND}/graphql`,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
};

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient("ws://localhost:9000/graphql", {
      lazy: true,
      reconnect: true,
    })
  );
};

export const client = (isHTTP: boolean, token?: string) => {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode || isHTTP) {
    link = createHttpLink(token);
  } else {
    link = createWSLink();
  }

  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache(),
  });
};

export const fetchGraphql = async <T>(
  query: DocumentNode,
  fetchPolicy: FetchPolicy,
  variables?: OperationVariables,
  token?: string
) => {
  const { data, error, loading } = await client(true, token).query<T>({
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
    const { data } = await client(true, token).mutate<T>({
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
