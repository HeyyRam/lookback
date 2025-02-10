import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxgsv5q0pUJTdbn4zIz__x2XJZrs8zvHw",
  authDomain: "lookback-92b0c.firebaseapp.com",
  projectId: "lookback-92b0c",
  storageBucket: "lookback-92b0c.firebasestorage.app",
  messagingSenderId: "384612096701",
  appId: "1:384612096701:web:8a0ceed62509926fc5b5d4",
  measurementId: "G-YF3MNSYR76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);