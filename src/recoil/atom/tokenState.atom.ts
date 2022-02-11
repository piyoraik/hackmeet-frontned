import { atom } from "recoil";

export const tokenStateAtom = atom<string>({
  key: "token/tokenAtom",
  default: "",
});
