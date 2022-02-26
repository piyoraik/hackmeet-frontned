import { Workspace } from "@/types/workspace.type";
import { gql } from "@apollo/client";

export const WORKSPACE_FINDID_QUERY = gql`
  query ($id: String!) {
    findOneWorkspace(id: $id) {
      id
      recruit {
        id
        title
      }
      channels {
        id
        name
        isPublic
      }
      joins {
        user {
          id
          nickname
          picture
          userId
        }
      }
    }
  }
`;

export interface WORKSPACE_FINDID_QUERY {
  findOneWorkspace: Workspace;
}
