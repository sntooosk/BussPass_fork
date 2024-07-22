
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {

  apiKey: "AIzaSyDpjiA3Trf7k1JtXv5ay5XupgpkiRZvv34",
  authDomain: "busspass-21a6c.firebaseapp.com",
  projectId: "busspass-21a6c",
  storageBucket: "busspass-21a6c.appspot.com",
  messagingSenderId: "14962913685",
  appId: "1:14962913685:web:47f5c55ae115d1127a069c",
  measurementId: "G-MRPM436WZ7"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { db, auth };
