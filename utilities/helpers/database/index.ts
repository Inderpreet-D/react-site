import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  console.log({ privateKey, clientEmail })
  const credential = admin.credential.cert({
    projectId: 'react-site-inder',
    privateKey,
    clientEmail
  })

  const databaseURL = 'https://react-site-inder.firebaseio.com'

  admin.initializeApp({ credential, databaseURL })
}

const Database = admin.database()

export const get = async <T>(path: string) => {
  return (await (await Database.ref(path).get()).val()) as T | null
}

export const set = async (path: string, data: any) => {
  return await Database.ref(path).set(data)
}

export default Database
