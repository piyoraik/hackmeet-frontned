import { Feature } from "./feature.type";
import { Framework } from "./framework.type";
import { Language } from "./language.type";

export interface Recruit {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

export const initialRecruit: Recruit = {
  id: "hoge",
  title: "hoge",
  thumbnail: "partying_face",
  content: "hoge",
  languages: [],
  frameworks: [],
  features: [],
};
