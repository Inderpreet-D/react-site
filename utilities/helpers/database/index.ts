import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  const credential = admin.credential.cert({
    projectId: "react-site-inder",
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  });

  const databaseURL = "https://react-site-inder.firebaseio.com";

  admin.initializeApp({ credential, databaseURL });
}

const Database = admin.database();

export const get = async (path: string) => await Database.ref(path).get();

export const set = async (path: string, data: any) =>
  await Database.ref(path).set(data);

// export const push = async (path: string, data: any) =>
// await Database.ref(path).push(data);

export default Database;
