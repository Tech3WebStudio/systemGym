// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDVNIybWOqB-rV8mUftbthA8Ok778q5Tfc",
  authDomain: "api-gym-3e35a.firebaseapp.com",
  projectId: "api-gym-3e35a",
  storageBucket: "api-gym-3e35a.appspot.com",
  messagingSenderId: "492389825425",
  appId: "1:492389825425:web:04e4a7bea16a53b24ff830",
  measurementId: "G-PFY4EMJQ26",
});


// Initialize Firebase

//const app = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();