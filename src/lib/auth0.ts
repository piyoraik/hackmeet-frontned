import axios, { Axios, AxiosResponse } from "axios";
import { Auth0UserType, TokenType } from "@/types/auth0.type";

export const getAccessToken = async () => {
  const res = await axios
    .request({
      method: "POST",
      url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        client_id: process.env.NEXT_PUBLIC_CLIENTTEST_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        audience: process.env.NEXT_PUBLIC_IDENTIFIRE,
        grant_type: "client_credentials",
      },
    })
    .then((res: AxiosResponse<TokenType>) => {
      return res.data;
    })
    .catch((err) => {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw err;
    });
  return res;
};

export const getUser = async (user_id: string, token: string) => {
  const user = await axios
    .request({
      method: "GET",
      url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${user_id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res: AxiosResponse<Auth0UserType>) => {
      return res.data;
    })
    .catch((err) => {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw err;
    });
  return user;
};