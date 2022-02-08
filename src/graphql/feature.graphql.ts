import { gql } from "@apollo/client";
import { Feature } from "@/types/feature.type";

export const ALL_FEATURE = gql`
  query {
    features {
      id
      name
      icon
      color
    }
  }
`;

export interface Features {
  features: Feature[]
}