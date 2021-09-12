// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQMQzb1Jyvb1r_74FhLWtDB3CUfr6afHc",
  authDomain: "bits-0f-c0de.firebaseapp.com",
  projectId: "bits-0f-c0de",
  storageBucket: "bits-0f-c0de.appspot.com",
  messagingSenderId: "368574995442",
  appId: "1:368574995442:web:d72e83386837e5ea71296b",
  measurementId: "G-EQ0WCPE018",
};
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// Initialize Firebase
const db = getFirestore(app);

export { auth, provider, db };
