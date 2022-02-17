import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const getUser = (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  res.status(200).json({ session });
};

export default getUser;
