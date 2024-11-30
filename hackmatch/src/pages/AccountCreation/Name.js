import './Name.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import test from "../Signup";

// Your Firebase config
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
const analytics = getAnalytics(app);

const db = getFirestore(app);

const email = localStorage.getItem('email'); 

function Name() {


    // name setting variables
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);




    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        localStorage.setItem("firstName", FirstName);
        localStorage.setItem("lastName", LastName);

        // Create the document in Firestore
        try {
            await setDoc(doc(db, "Users", email), {
                firstName: FirstName,
                lastName: LastName
            });
            navigate("/Links"); 

        } catch (err) {
            alert(err.message);
        }

        setLoading(false);
    };

    return (
        <div className='signup'>
            <h1>Account Created</h1>
            <p>Now we need some basic hacker info from you!</p>
            <p>Let's Start With Your Name</p>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Continue'}
                </button>
            </form>
        </div>
    );
    
}

export default Name;
