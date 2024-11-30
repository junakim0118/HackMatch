import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

// Your Firebase config

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
