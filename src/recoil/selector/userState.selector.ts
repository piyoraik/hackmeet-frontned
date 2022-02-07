import { selector } from "recoil";
import { User } from "@auth0/auth0-react";
import { userStateAtom } from "../atom/userState.atom";

export const userStateSelector = selector<User>({
  key: "user/userSelector",
  get: ({ get }) => {
    const user = get(userStateAtom);
    return user;
  },
  set: ({ set }, value) => {
    set(userStateAtom, value);
  },
});
