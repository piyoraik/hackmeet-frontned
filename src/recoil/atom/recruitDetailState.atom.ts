import { Recruit } from "@/types/recruit.type";
import { atom } from "recoil";

export const recruitDetailStateAtom = atom<Recruit>({
  key: "recruit/detailAtom",
  default: {
    id: "hoge",
    title: "hoge",
    thumbnail: "partying_face",
    content: "hoge",
    peoples: 1,
    languages: [],
    frameworks: [],
    features: [],
    user: {
      id: "hoge",
      nickname: "hoge",
      picture: "hoge",
      userId: "hoge",
    },
    joins: [],
    workspace: {
      id: "hoge",
      joins: [],
      channels: [],
    },
    createdAt: "",
  },
});
