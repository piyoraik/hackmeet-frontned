import { Workspace } from "@/types/workspace.type";
import { gql } from "@apollo/client";

export const WORKSPACE_FINDID_QUERY = gql`
  query ($id: String!) {
    findOneWorkspace(id: $id) {
      id
      recruit {
        id
        title
        thumbnail
        content
        createdAt
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
        workspace {
          id
          joins {
            id
            user {
              id
              nickname
              userId
            }
          }
        }
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
