import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import './Login.css';

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
  const [loadCreate, setLoadCreate] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            navigate("/Home"); 

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

    setLoading(false);
  };

  const createAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      navigate("/Signup"); 
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <div className="container">
      <h1 className="log">L O G I N</h1>
      <hr className = "line"/>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password"
        />
    
        <button type="submit" disabled={loading} className="create">
          {loading ? 'Creating Account...' : 'Sign In'}
        </button>
       
      </form>
      <form onSubmit={createAccount}>
        <div className="acc">
      <label>Dont Have an account yet?</label>
        <button type="submit" disabled={loadCreate}>
          {loading ? 'Creating Account...' : 'Click here to sign up!'}
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Signup;
