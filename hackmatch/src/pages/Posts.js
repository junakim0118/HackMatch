import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 

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

function Posts() {

    const [pic, setPic] = useState(null);
    const [selectedOption, setSelectedOption] = useState(""); // Dropdown state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { pic, selectedOption });
    // Add your form submission logic here
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
        setPic(URL.createObjectURL(file)); // Previews uploaded image
    }
};

//   const createAccount = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       navigate("/Signup"); 
//     } catch (err) {
//       alert(err.message);
//     }

//     setLoading(false);
//   };

  return (
    <div className="page">
      <div className="container">
        <h1 className="log">Post your Pics!!</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="file"
            id="Pic"
            accept="image/*"
            onChange={handlePicUpload}
            hidden
          />
          <label htmlFor="Pic" style={{ cursor: "pointer", color: "blue" }}>
            Upload Picture
          </label>
          {pic && <img src={pic} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
          
          <label htmlFor="dropdown" style={{ marginTop: "20px", display: "block" }}>
            Choose a Category:
          </label>
          <select
            id="dropdown"
            className="dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled>Select an option</option>
            <option value="Team">Nature</option>
            <option value="Dinner">Technology</option>
            <option value="">Art</option>
          </select>

          <button type="submit" className="create" style={{ marginTop: "20px" }}>
            Post!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Posts;
