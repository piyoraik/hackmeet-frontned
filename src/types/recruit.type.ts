import { Feature } from "./feature.type";
import { Framework } from "./framework.type";
import { Join } from "./join.type";
import { Language } from "./language.type";
import { User } from "./user.type";
import { Workspace } from "./workspace.type";

export interface Recruit {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  peoples: number;
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
  user: User;
  joins: Join[];
  workspace: Workspace;
  createdAt: string;
}
