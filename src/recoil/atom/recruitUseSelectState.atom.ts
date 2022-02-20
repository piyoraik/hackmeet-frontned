import { atom } from "recoil";

export const recruitUseSelectStateAtom = atom<string[]>({
  key: "recruit/useSelectAtom",
  default: [],
});
