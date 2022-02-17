import { User } from "@/types/user.type";
import { gql } from "@apollo/client";

export const FIND_USERID = gql`
  query ($userId: String!) {
    findUserId(userId: $userId) {
      id
      nickname
      picture
    }
  }
`;

export interface FIND_USER {
  findUserId: User;
}

export const FIND_USER_PRIMAERY = gql`
  query ($id: String!) {
    findUserPrimaryId(id: $id) {
      id
      nickname
      userId
      picture
    }
  }
`;

export interface FIND_USER_PRIMARY {
  findUserPrimaryId: User;
}

export const UPDATE_USER = gql`
  mutation ($param: UpdateUserDTO!) {
    updateUser(updateUser: $param) {
      id
      userId
      nickname
      picture
    }
  }
`;

export interface UPDATE_USER_TYPE {
  updateUser: User;
}
