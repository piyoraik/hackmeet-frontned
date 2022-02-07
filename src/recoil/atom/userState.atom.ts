import { User } from "@auth0/auth0-react";
import { atom } from "recoil";

export const userStateAtom = atom<User>({
  key: "user/userAtom",
  default: {
    name: "",
    nickname: "",
    picture: "",
    sub: "",
    updated_at: "",
  },
});
