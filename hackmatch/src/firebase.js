// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBFCkPH2ZbloXAo4rpztmCPQe0zoFiopXQ",
    authDomain: "hackmatch-9fef5.firebaseapp.com",
    projectId: "hackmatch-9fef5",
    storageBucket: "hackmatch-9fef5.firebasestorage.app",
    messagingSenderId: "520362196145",
    appId: "1:520362196145:web:338074b520500558317690",
    measurementId: "G-SZV8RS906G"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
