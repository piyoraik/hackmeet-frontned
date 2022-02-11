import { ALL_LANGUAGE } from "@/graphql/language.graphql";
import { Language } from "@/types/language.type";
import { FetchPolicy, OperationVariables } from "@apollo/client";
import { DocumentNode } from "graphql";
import { client, httpHeader } from "./client";

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
