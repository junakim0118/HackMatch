import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './bio.css';

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
const auth = getAuth();

function Bio() {
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null); // Email state for Firebase Authentication
    const navigate = useNavigate();

    // Fetch current user email on auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email); // Set email when user is logged in
            } else {
                setEmail(null); // Reset if no user is logged in
            }
        });

        return unsubscribe; // Clean up listener on unmount
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bio.trim()) {
            alert("The bio field is required! Please tell us about yourself."); // Alert for empty bio
            return;
        }

        if (!email) {
            alert("Please sign in to continue."); // Ensure email exists (user must be logged in)
            return;
        }

        setLoading(true);
        localStorage.setItem("bio", bio);

        // Create the document in Firestore
        try {
            await setDoc(doc(db, "Users", email), {
                firstName: localStorage.getItem("firstName"),
                lastName: localStorage.getItem("lastName"),
                LinkedIn: localStorage.getItem("linkedIn"),
                github: localStorage.getItem("github"),
                portfolio: localStorage.getItem("portfolio"),
                bio: bio
            });

            navigate("/Fun");
        } catch (err) {
            alert(`Error: ${err.message}`);
        }

        setLoading(false);
    };

    const handleBioChange = (e) => {
        const input = e.target.value;
        if (input.length <= 50) {
            setBio(input);
        }
    };

    return (
        <div className='signup'>
            <div className='container'>
            <h1>Tell us about yourself</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <textarea
                        placeholder="Tell us about yourself"
                        value={bio}
                        onChange={handleBioChange}
                    />
                    <div
                        style={{
                            fontSize: '14px',
                            color: bio.length === 50 ? 'red' : 'black',
                        }}
                    >
                        {bio.length}/50
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Continue'}
                </button>
            </form>
        </div>
        </div>
    );
}

export default Bio;
