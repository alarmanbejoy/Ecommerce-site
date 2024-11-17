// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0FjysKAkJEd6Cfr9oNIyi3zoX0CbVgbw",
  authDomain: "myecom-18e24.firebaseapp.com",
  projectId: "myecom-18e24",
  storageBucket: "myecom-18e24.firebasestorage.app",
  messagingSenderId: "786469779673",
  appId: "1:786469779673:web:f588031177c4635941a6c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }