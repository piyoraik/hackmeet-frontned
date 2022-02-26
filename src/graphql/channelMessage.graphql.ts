import { ChannelMessage } from "@/types/channelMessage.type";
import { gql } from "@apollo/client";

export const CREATE_CHANNEL_MESSAGE = gql`
  mutation ($params: InputChannelMessageDTO!) {
    createChannelMessage(createChannelMessage: $params) {
      id
      message
      channel {
        id
        name
      }
      user {
        id
        nickname
        picture
        userId
      }
    }
  }
`;

export interface CREATE_CHANNEL_MESSAGE {
  createChannelMessage: ChannelMessage;
}

export const SUBSCRIPTION_MESSAGE = gql`
  subscription {
    createChannelMessage {
      id
      message
      channel {
        id
        name
      }
      user {
        id
        userId
        nickname
        picture
      }
    }
  }
`;

export interface SUBSCRIPTION_MESSAGE {
  createChannelMessage: ChannelMessage;
}
