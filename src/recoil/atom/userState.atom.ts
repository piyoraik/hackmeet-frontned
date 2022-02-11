import { User } from "@/types/user.type";
import { atom } from "recoil";

export const userStateAtom = atom<User | null>({
  key: "user/userAtom",
  default: null,
});
