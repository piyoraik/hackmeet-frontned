import { FetchPolicy } from "@apollo/client";
import { DocumentNode } from "graphql";
import { client } from "./client";

export const fetchGraphql = async <T>(query: DocumentNode, fetchPolicy: FetchPolicy) => {
  const { data, error, loading } = await client.query<T>({
    query,
    fetchPolicy,
  });

  return {
    data,
    error,
    loading
  };
};
