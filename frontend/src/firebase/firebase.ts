import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqXPj3vOlOUByMVvOU2CGqWMbYEGDvnYM",
  authDomain: "mapnotes-3fe40.firebaseapp.com",
  projectId: "mapnotes-3fe40",
  storageBucket: "mapnotes-3fe40.appspot.com",
  messagingSenderId: "809813888012",
  appId: "1:809813888012:web:fd66d94fe50554b4203229",
  measurementId: "G-6NPE4CZD36",
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const firebaseStorage = getStorage(app);

export { app, auth, googleProvider, firebaseStorage };
