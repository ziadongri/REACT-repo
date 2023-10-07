// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf6MhhUc-_3QyZ9pUtSWu7l8T_A7mAOj4",
  authDomain: "faculty-form-e409f.firebaseapp.com",
  projectId: "faculty-form-e409f",
  storageBucket: "faculty-form-e409f.appspot.com",
  messagingSenderId: "986149598459",
  appId: "1:986149598459:web:ec4bb407a5f963d7822c5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
