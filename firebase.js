// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Optional: If you want to use Firebase Analytics
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArbgHsJvJkLG-FkCgy-BakuB46mlH0VmY",
  authDomain: "inventory-management-8703b.firebaseapp.com",
  projectId: "inventory-management-8703b",
  storageBucket: "inventory-management-8703b.appspot.com",
  messagingSenderId: "709377695989",
  appId: "1:709377695989:web:af39e13e69c057383c25bc",
  measurementId: "G-HPN9Q8D76Z"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, firestore };
