import { User } from "@auth0/auth0-react";
import { Recruit } from "./wanted.type";

export interface Join {
  id: string;
  recruit: Recruit;
  user: User;
}
