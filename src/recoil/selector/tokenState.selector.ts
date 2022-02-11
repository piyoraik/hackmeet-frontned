import { selector } from "recoil";
import { tokenStateAtom } from "../atom/tokenState.atom";

export const tokenStateSelector = selector<string>({
  key: "token/tokenSelector",
  get: ({ get }) => {
    const token = get(tokenStateAtom);
    return token;
  },
  set: ({ set }, value) => {
    set(tokenStateAtom, value);
  },
});
