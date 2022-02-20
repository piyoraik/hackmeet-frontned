import { Join } from "@/types/join.type";
import { Recruit } from "@/types/recruit.type";
import { gql } from "@apollo/client";

export const ALL_JOIN = gql`
  query {
    joins {
      id
      user {
        id
        nickname
        picture
      }
      recruit {
        id
        title
      }
    }
  }
`;

export interface Joins {
  joins: Join[] | null
}

export const CREATE_JOIN = gql`
  mutation ($param: InputJoinDTO!) {
    createJoin(createJoin: $param) {
      id
      recruit {
        id
        title
        joins {
          id
          user {
            id
            nickname
            picture
          }
        }
      }
    }
  }
`;

export interface CreateJoinType {
  createJoin: {
    id: string;
    recruit: Recruit
  }
}