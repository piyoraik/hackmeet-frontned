import { Workspace } from "@/types/workspace.type";
import { gql } from "@apollo/client";

export const CREATE_JOIN = gql`
  mutation ($param: InputJoinDTO!) {
    createJoin(createJoin: $param) {
      id
      workspace {
        id
        joins {
          id
          user {
            id
            nickname
          }
        }
      }
    }
  }
`;

export interface CreateJoinType {
  createJoin: {
    id: string;
    workspace: Workspace;
  };
}
