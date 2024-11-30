import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFCkPH2ZbloXAo4rpztmCPQe0zoFiopXQ",
  authDomain: "hackmatch-9fef5.firebaseapp.com",
  projectId: "hackmatch-9fef5",
  storageBucket: "hackmatch-9fef5.firebasestorage.app",
  messagingSenderId: "520362196145",
  appId: "1:520362196145:web:338074b520500558317690",
  measurementId: "G-SZV8RS906G",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);



function AccountCreation() {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          //await createUserWithEmailAndPassword(auth, email, password);
    
        } catch (err) {
          alert(err.message);
        }
    
        setLoading(false);
      };

    return (
        <div>
          <h1>Account Created</h1>
          <p>Lets Start With Your Name</p>
          <input
          type="text"
          placeholder="First Name"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button></button>
        </div>
      );
}

export default AccountCreation;
