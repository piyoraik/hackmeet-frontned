import { Feature } from "./feature.type";
import { Framework } from "./framework.type";
import { Language } from "./language.type";
import { User } from "./user.type";

export interface Recruit {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
  user: User;
}
