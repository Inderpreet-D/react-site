import { NextApiRequest, NextApiResponse } from "next";
import Admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const DB = Admin.initializeApp({
  credential: Admin.credential.cert({
    projectId: "react-site-inder",
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: "https://react-site-inder.firebaseio.com",
}).database();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await DB.ref("test").get();
  res.status(200).send(data);
};
