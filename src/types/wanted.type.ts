import { Features } from "../graphql/feature.graphql";
import { Framework } from "./framework.type";
import { Language } from "./language.type";

export interface Recruit {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  languages: Language[];
  frameworks: Framework[];
  features: Features[];
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
