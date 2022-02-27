import { Channel } from "./channel.type";
import { User } from "./user.type";

export interface ChannelMessage {
  id: string;
  channel: Channel;
  user: User;
  message: string;
  createdAt: string;
}
