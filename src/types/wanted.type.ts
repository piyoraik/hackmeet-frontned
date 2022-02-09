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

export const initialRecruit: Recruit = {
  id: "hoge",
  title: "hoge",
  thumbnail: "partying_face",
  content: "hoge",
  languages: [],
  frameworks: [],
  features: [],
  user: {
    id: "hoge",
    name: "hoge",
    nickname: "hoge",
    description: "hoge",
    userId: "hoge",
    picture: "string",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
};
