import { gql } from "@apollo/client";
import { Framework } from "../types/framework.type";

export const ALL_FRAMEWORK = gql`
  query {
    frameworks {
      id
      name
    }
  }
`;

export interface Frameworks {
  frameworks: Framework[]
}