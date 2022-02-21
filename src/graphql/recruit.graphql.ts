import gql from "graphql-tag";
import { Feature } from "../types/feature.type";
import { Framework } from "../types/framework.type";
import { Language } from "../types/language.type";
import { Recruit } from "../types/recruit.type";

// ALL_WANTED
export const ALL_WANTED = gql`
  query {
    recruits {
      id
      title
      thumbnail
      content
      user {
        id
        nickname
        picture
      }
    }
  }
`;

export interface Recruits {
  recruits: Recruit[];
}

// CREATE_WANTED
export const CREATE_WANTED = gql`
  mutation ($param: CreateRecruitsDTO!) {
    createRecruit(createRecruit: $param) {
      id
      title
      thumbnail
      content
      languages {
        id
        name
      }
      frameworks {
        id
        name
      }
      features {
        id
        name
      }
      user {
        id
        nickname
        picture
        userId
      }
      joins {
        user {
          id
          nickname
          picture
        }
      }
    }
  }
`;

export interface CreateRecruitsDTOType {
  createRecruit: Recruit;
}

// FINDONE_WANTED
export const FINDONE_WANTED = gql`
  query ($id: String!) {
    findOneIdRecruit(id: $id) {
      id
      title
      thumbnail
      content
      peoples
      languages {
        id
        name
        icon
        color
      }
      frameworks {
        id
        name
        icon
        color
      }
      features {
        id
        name
        icon
        color
      }
      user {
        id
        nickname
        picture
        userId
      }
      joins {
        user {
          id
          nickname
          picture
        }
      }
    }
  }
`;

export interface findOneIdRecruitType {
  findOneIdRecruit: {
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    languages: Language[];
    frameworks: Framework[];
    features: Feature[];
  };
}

export const SEARCH_WANTED = gql`
  query ($params: SearchRecruitsDTO!) {
    searchRecruit(searchRecruit: $params) {
      id
      title
      thumbnail
      content
      peoples
      languages {
        id
        name
        icon
        color
      }
      frameworks {
        id
        name
        icon
        color
      }
      features {
        id
        name
        icon
        color
      }
      user {
        id
        nickname
        picture
      }
      joins {
        user {
          id
          nickname
          picture
        }
      }
    }
  }
`;

export interface searchRecruitType {
  searchRecruit: Recruit[];
}
