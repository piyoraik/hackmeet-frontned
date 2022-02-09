import { ALL_LANGUAGE } from "@/graphql/language.graphql";
import { Language } from "@/types/language.type";
import { FetchPolicy } from "@apollo/client";
import { DocumentNode } from "graphql";
import { client, httpHeader } from "./client";

export const fetchGraphql = async <T>(
  query: DocumentNode,
  fetchPolicy: FetchPolicy
) => {
  const link = httpHeader();
  const { data, error, loading } = await client(link).query<T>({
    query,
    fetchPolicy,
  });

  return {
    data,
    error,
    loading,
  };
};
