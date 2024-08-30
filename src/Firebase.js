// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARMdmN7sJCERKq-C4fcV4aQhnwFbbJ6QA",
  authDomain: "wizemoney-2024.firebaseapp.com",
  projectId: "wizemoney-2024",
  storageBucket: "wizemoney-2024.appspot.com",
  messagingSenderId: "683973432057",
  appId: "1:683973432057:web:38147e85eded5bb3928828",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
