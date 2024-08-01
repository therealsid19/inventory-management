// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArbgHsJvJkLG-FkCgy-BakuB46mlH0VmY",
  authDomain: "inventory-management-8703b.firebaseapp.com",
  projectId: "inventory-management-8703b",
  storageBucket: "inventory-management-8703b.appspot.com",
  messagingSenderId: "709377695989",
  appId: "1:709377695989:web:af39e13e69c057383c25bc",
  measurementId: "G-HPN9Q8D76Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export {firestore};