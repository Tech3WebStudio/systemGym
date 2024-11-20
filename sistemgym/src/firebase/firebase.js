// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVNIybWOqB-rV8mUftbthA8Ok778q5Tfc",
  authDomain: "api-gym-3e35a.firebaseapp.com",
  projectId: "api-gym-3e35a",
  storageBucket: "api-gym-3e35a.appspot.com",
  messagingSenderId: "492389825425",
  appId: "1:492389825425:web:04e4a7bea16a53b24ff830",
  measurementId: "G-PFY4EMJQ26",
};

// Initialize Firebase (only once)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
