import { Session } from "@auth0/nextjs-auth0";
import axios from "axios";

export const GetSession = async () => {
  const session = await axios
    .get("/api/getuser")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.log(err.message);
      }
      throw Error("予期せぬエラー");
    });
  return session;
};
