// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAKsySOmURW60c61OpEV-Uk21WgnNY0y8Y",
  authDomain: "nextjs--tutorial.firebaseapp.com",
  projectId: "nextjs--tutorial",
  storageBucket: "nextjs--tutorial.appspot.com",
  messagingSenderId: "676906804370",
  appId: "1:676906804370:web:fb54d0e1b4376f22c8724b",
  measurementId: "G-VWBLG414HJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);