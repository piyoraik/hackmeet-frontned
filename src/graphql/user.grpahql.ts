import { User } from "@/types/user.type";
import { gql } from "@apollo/client";

export const FIND_USERID = gql`
  query($id: String!) {
    findUserId(id: $id) {
      id
      nickname
      picture
    }
  }
`;

export interface FIND_USER {
  findUserId: User
}

export const FIND_USER_PRIMAERY = gql`
  query ($id: String!) {
    findUserPrimaryId(id: $id) {
      id
      nickname
      userId
    }
  }
`;

export interface FIND_USER_PRIMARY {
  findUserPrimaryId: User
}