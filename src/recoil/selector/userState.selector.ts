import { User } from "@/types/user.type";
import { selector } from "recoil";
import { userStateAtom } from "../atom/userState.atom";

export const userStateSelector = selector<User | null>({
  key: "user/userSelector",
  get: ({ get }) => {
    const user = get(userStateAtom);
    return user;
  },
  set: ({ set }, value) => {
    set(userStateAtom, value);
  },
});
