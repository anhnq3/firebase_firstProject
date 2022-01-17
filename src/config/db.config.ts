import * as dotenv from 'dotenv';
import 'dotenv/config';
import * as firebase from 'firebase-admin';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

if (!firebase.apps?.length) {
  const firebase_params = {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  firebase.initializeApp({
    credential: firebase.credential.cert(firebase_params),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_WEB_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_CLIENT_APP_ID,
  measurementId: process.env.FIREBASE_CLIENT_MESUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = firebase.firestore();
// export const dbFirestore = getFirestore();
