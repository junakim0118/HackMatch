import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import "./Signup.css"

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem('email',email);
      await createUserWithEmailAndPassword(auth, email, password);

      navigate('/accountCreation'); 
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Signup;
