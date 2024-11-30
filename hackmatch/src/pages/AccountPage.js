import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import "./Signup.css";
import "./AccountPage.css";
import icon from "../images/icon.png";

// import { ChakraProvider, Button } from "@chakra-ui/react";

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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Your AccountPage content
let name = "Nathan Wan";
let bio = "Hello! I am a software developer. I love to code.";
let github = "https://github.com/nathan-nw";
let linkedin = "https://www.linkedin.com/in/nathan-wan-82355b258/";
let website = "https://www.hackwestern.com/";

function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="top">
        <img src={icon} alt="description" className="icon" />
        <div className="header">
          <text classNam="name">{name}</text>
        </div>
      </div>
      <div className="bottom">
        <div className="bio">
          <div className="bio-header">Bio:</div>
          <div className="bio-text">{bio}</div>
        </div>
        <div className="links">
          <a href={github}>
            <FaGithub />
          </a>
          <a href={linkedin}>
            <FaLinkedin />
          </a>
          <a href={website}>{website && <CgWebsite />}</a>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
