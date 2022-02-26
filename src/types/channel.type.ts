import { ChannelMessage } from "./channelMessage.type";
import { User } from "./user.type";
import { Workspace } from "./workspace.type";

export interface Channel {
  id: string;
  workspace: Workspace;
  user: User;
  name: string;
  isPublic: boolean;
  channelMessages: ChannelMessage[];
}
