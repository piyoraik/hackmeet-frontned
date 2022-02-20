import { selector } from "recoil";
import { recruitUseSelectStateAtom } from "../atom/recruitUseSelectState.atom";

export const recruitUseSelectStateSelector = selector<string[]>({
  key: "recruit/useSelectSelector",
  get: ({ get }) => {
    const useSelect = get(recruitUseSelectStateAtom);
    return useSelect;
  },

  set: ({ set }, useSelect) => {
    set(recruitUseSelectStateAtom, useSelect);
  },
});
