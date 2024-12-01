import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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

function Links() {
    const [LinkedIn, setLinkedIn] = useState('');
    const [Github, setGithub] = useState('');
    const [Portfolio, setPortfolio] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null); // Store email state
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

    // Fetch user data from Firestore
    async function fetchUserData(email) {
        try {
            const docRef = doc(db, "users", email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("Please sign in to continue.");
            return;
        }

        setLoading(true);

        // Store links in localStorage
        localStorage.setItem("linkedIn", LinkedIn);
        localStorage.setItem("github", Github);
        localStorage.setItem("portfolio", Portfolio);

        // Create the document in Firestore
        try {
            const docRef = doc(db, "Users", email);
            const docSnap = await getDoc(docRef);

            await setDoc(doc(db, "Users", email), {
                firstName: localStorage.getItem("firstName"),
                lastName: localStorage.getItem("lastName"),
                LinkedIn: LinkedIn,
                github: Github,
                portfolio: Portfolio
            });

            navigate("/Bio");
        } catch (err) {
            alert(err.message);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Let's Get Some Important Links</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter the link to your LinkedIn</label>
                <input
                    type="text"
                    placeholder="LinkedIn Link"
                    value={LinkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                />
                <br />
                <br />
                <label>Enter the link to your Github</label>
                <input
                    type="text"
                    placeholder="GitHub Link"
                    value={Github}
                    onChange={(e) => setGithub(e.target.value)}
                />
                <br />
                <br />
                <label>Enter the link to your Portfolio</label>
                <input
                    type="text"
                    placeholder="Portfolio Link"
                    value={Portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Continue'}
                </button>
            </form>
        </div>
    );
}

export default Links;
