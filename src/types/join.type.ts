import { User } from "@auth0/auth0-react";
import { Recruit } from "./recruit.type";

export interface Join {
  id: string;
  recruit: Recruit;
  user: User;
}
