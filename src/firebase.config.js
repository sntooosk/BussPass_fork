import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };