import { Recruit } from "@/types/wanted.type";
import { selector } from "recoil";
import { recruitDetailStateAtom } from "../atom/recruitDetailState.atom";

export const recruitDetailStateSelector = selector<Recruit>({
  key: "recruit/detailSelector",
  get: ({ get }) => {
    const recruit = get(recruitDetailStateAtom);
    return recruit;
  },
  set: ({ set }, recruit) => {
    set(recruitDetailStateAtom, recruit);
  },
});
