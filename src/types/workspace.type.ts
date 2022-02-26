import { Channel } from "./channel.type";
import { Join } from "./join.type";
import { Recruit } from "./recruit.type";

export interface Workspace {
  id: string;
  joins: Join[];
  recruit?: Recruit;
  channels: Channel[];
}
