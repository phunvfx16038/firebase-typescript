import firebase from "firebase/compat/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4BHecg33xWL9_AvwgqPT9rD7YXIqDiKM",
  authDomain: "note-68d18.firebaseapp.com",
  projectId: "note-68d18",
  storageBucket: "note-68d18.appspot.com",
  messagingSenderId: "968161530324",
  appId: "1:968161530324:web:d186e5ba1b31082c680641",
  measurementId: "G-E7F2ZGTT9D"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
