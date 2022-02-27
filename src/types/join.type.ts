import { Recruit } from "./recruit.type";
import { User } from "./user.type";

export interface Join {
  id: string;
  recruit: Recruit;
  user: User;
}
