import { Recruit } from "@/types/wanted.type";
import { atom } from "recoil";

export const recruitDetailStateAtom = atom<Recruit>({
  key: "recruit/detailAtom",
  default: {
    id: "hoge",
    title: "hoge",
    thumbnail: "partying_face",
    content: "hoge",
    languages: [],
    frameworks: [],
    features: [],
    user: {
      id: "hoge",
      nickname: "hoge",
      description: "hoge",
      userId: "hoge",
      picture: "string",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  },
});
