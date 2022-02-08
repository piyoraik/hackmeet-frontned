import { gql } from "@apollo/client";
import { Language } from "../types/language.type";

export const ALL_LANGUAGE = gql`
  query {
    languages {
      id
      name
      icon
      color
    }
  }
`;

export interface Languages {
  languages: Language[];
}
