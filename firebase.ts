// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDE2VTSBZogFh-CdodjbYmBIu-D5vqUOfQ",
  authDomain: "notion-clone-3e7f3.firebaseapp.com",
  projectId: "notion-clone-3e7f3",
  storageBucket: "notion-clone-3e7f3.appspot.com",
  messagingSenderId: "699422110665",
  appId: "1:699422110665:web:74ff81c70821cd36adae18",
  measurementId: "G-PGECS9HTKM"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };