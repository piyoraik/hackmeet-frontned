import gql from "graphql-tag";
import { Recruit } from "../types/wanted.type";

// ALL_WANTED
export const ALL_WANTED = gql`
  query {
    recruits {
      id
      title
      content
    }
  }
`;

export interface Recruits {
  recruits: Recruit[] | null;
}

// CREATE_WANTED
export const CREATE_WANTED = gql`
  mutation ($param: CreateRecruitsDTO!) {
    createRecruit(createRecruit: $param) {
      id
      title
      content
    }
  }
`;

export interface CreateRecruitsDTOType {
  createRecruit: Recruit
}

// FINDONE_WANTED
export const FINDONE_WANTED = gql`
  query ($id: String!) {
    findOneIdRecruit(id: $id) {
      id
      title
      content
    }
  }
`;

export interface findOneIdRecruitType {
  findOneIdRecruit: {
    id: string;
    title: string;
    content: string
  }
}