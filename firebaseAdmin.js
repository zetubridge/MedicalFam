// firebaseAdmin.js
import admin from "firebase-admin";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG_JSON);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

const db = admin.firestore();

export { admin, db };
