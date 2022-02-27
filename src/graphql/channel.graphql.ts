import { Channel } from "@/types/channel.type";
import { gql } from "@apollo/client";

export const CHANNEL_FINDONE_QUERY = gql`
  query ($id: String!) {
    findOneChannel(id: $id) {
      id
      name
      workspace {
        id
        recruit {
          id
          title
        }
      }
      user {
        id
        nickname
        picture
        userId
      }
      channelMessages {
        id
        message
        user {
          id
          nickname
          picture
          userId
        }
        createdAt
      }
      isPublic
    }
  }
`;

export interface CHANNEL_FINDONE_QUERY {
  findOneChannel: Channel;
}
