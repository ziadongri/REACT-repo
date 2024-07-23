// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";

import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import doc and getDoc here

import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCn-TMsjSYcfoLfe93_pze0b9fWNw6eHtc",
  authDomain: "faculty-form-1021d.firebaseapp.com",
  projectId: "faculty-form-1021d",
  storageBucket: "faculty-form-1021d.appspot.com",
  messagingSenderId: "211567450129",
  appId: "1:211567450129:web:20d9729db65197c351f9b0",
  measurementId: "G-96682750DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();

export { doc, getDoc };