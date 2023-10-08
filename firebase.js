// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAj7eP1U4Wqsu7C5dkS7F3IngaHhlnZuBg",
  authDomain: "acme-536c1.firebaseapp.com",
  projectId: "acme-536c1",
  storageBucket: "acme-536c1.appspot.com",
  messagingSenderId: "569056577221",
  appId: "1:569056577221:web:4a48606ae1ea7208cf52ac",
  measurementId: "G-KNZNXQ24KD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const storage = getStorage(app);
export default storage;

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const signInWithTwitter = async () => {
  try {
    const res = await signInWithPopup(auth, twitterProvider);
    const user = res.user;
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};
