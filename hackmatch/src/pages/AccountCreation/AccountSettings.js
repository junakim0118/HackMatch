import { IoHome } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AccountSettings.css";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyBFCkPH2ZbloXAo4rpztmCPQe0zoFiopXQ",
    authDomain: "hackmatch-9fef5.firebaseapp.com",
    projectId: "hackmatch-9fef5",
    storageBucket: "hackmatch-9fef5",
    messagingSenderId: "520362196145",
    appId: "1:520362196145:web:338074b520500558317690",
};
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0]; // Use the existing app instance
}

const db = getFirestore(app);
const auth = getAuth(app);

const AccountSettings = () => {
    const [LinkedIn, setLinkedIn] = useState("");
    const [Github, setGithub] = useState("");
    const [Portfolio, setPortfolio] = useState("");
    const [year, setYear] = useState("");
    const [dayornight, setDayorNight] = useState("");
    const [focus, setFocus] = useState("");
    const [midnightsnack, setMidnightsnack] = useState("");
    const [algorithm, setAlgorithm] = useState("");
    const [song, setSong] = useState("");
    const [hobby, setHobby] = useState("");
    const [favouriteLanguage, setLanguage] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [caffeine, setCaffeine] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [school, setSchool] = useState("");
    const [email, setEmail] = useState("");


    // Handles LinkedIn input
const handleLinkedInChange = (e) => {
  setLinkedIn(e.target.value);
};

// Handles Github input
const handleGithubChange = (e) => {
  setGithub(e.target.value);
};

// Handles Portfolio input
const handlePortfolioChange = (e) => {
  setPortfolio(e.target.value);
};

// Handles year selection
const handleYearChange = (e) => {
  setYear(e.target.value);
};

// Handles day/night selection
const handleDayorNightChange = (e) => {
  setDayorNight(e.target.value);
};

// Handles focus selection
const handleFocusChange = (e) => {
  setFocus(e.target.value);
};

// Handles midnight snack input
const handleSnackChange = (e) => {
  setMidnightsnack(e.target.value);
};

// Handles algorithm input
const handleAlgorithmChange = (e) => {
  setAlgorithm(e.target.value);
};

// Handles song input
const handleSongChange = (e) => {
  setSong(e.target.value);
};

// Handles hobby input
const handleHobbyChange = (e) => {
  setHobby(e.target.value);
};

// Handles favourite programming language selection
const handleLanguageChange = (e) => {
  setLanguage(e.target.value);
};

// Handles bio input
const handleBioChange = (e) => {
  setBio(e.target.value);
};

// Handles caffeine selection
const handleCaffeineChange = (e) => {
  setCaffeine(e.target.value);
};

// Handles name input
const handleNameChange = (e) => {
  setName(e.target.value);
};

// Handles school selection
const handleSchoolChange = (e) => {
  setSchool(e.target.value);
};


    const navigate = useNavigate();

    // Handles profile picture upload
    const handleProfilePicUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file)); // Previews uploaded image
        }
    };

    // Fetch authenticated user's email on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                setEmail(user.email); // Set the authenticated user's email
            } else {
                console.log("No authenticated user found.");
                navigate("/login"); // Redirect to login if no user
            }
        });
        return () => unsubscribe(); // Clean up the listener
    }, [auth, navigate]);

    // Fetch user data from Firestore
    useEffect(() => {
        if (email) {
            const fetchUserData = async () => {
                try {
                    const docRef = doc(db, "Users", email);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setName(data.firstName + " " + data.lastName);
                        setLinkedIn(data.LinkedIn || "");
                        setGithub(data.github || "");
                        setPortfolio(data.portfolio || "");
                        setBio(data.bio || "");
                        setYear(data.year || "");
                        setDayorNight(data.dayornight || "");
                        setFocus(data.focus || "");
                        setMidnightsnack(data.midnightsnack || "");
                        setAlgorithm(data.algorithm || "");
                        setSong(data.song || "");
                        setHobby(data.hobby || "");
                        setLanguage(data.favouriteLanguage || "");
                        setCaffeine(data.caffeine || "");
                        setSchool(data.School || "");
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [email]);

    const handleFirestoreUpdate = async () => {
        try {
            const docRef = doc(db, "Users", email);

            await setDoc(docRef, {
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1] || "",
                LinkedIn,
                github: Github,
                portfolio: Portfolio,
                bio,
                year,
                dayornight,
                focus,
                midnightsnack,
                algorithm,
                song,
                hobby,
                favouriteLanguage,
                caffeine,
            });

            alert("Profile updated successfully!");
            navigate("/home");
        } catch (err) {
            console.error("Error updating profile:", err);
            alert(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFirestoreUpdate();
    };

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                alert("You have been logged out.");
                navigate("/login"); // Redirect to login page
            })
            .catch((error) => {
                console.error("Logout error:", error);
                alert("Error logging out.");
            });
    };

    // Programming languages, schools, and caffeine options
    const programmingLanguages = [
        "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Rust",
        "Kotlin", "Swift", "PHP", "TypeScript", "Scala", "Perl", "R", "Haskell",
    ];
    const Schools = ["Western", "McMaster", "Laurier", "Queens"];
    const Caffeine = ["Coffee", "Brewed tea", "Energy Drinks", "No caffeine", "Matcha", "Sugar"];

    return (
      <div className="signup">
      <h1>A C C O U N T   S E T T I N G S</h1>
      {/* Profile Picture Section */}
<div className="profile-pic-section">
  <label htmlFor="profilePic">
    <img
      src={profilePic || "https://via.placeholder.com/150"}
      alt="Profile"
      className="profile-pic"
    />
  </label>
  <input
    type="file"
    id="profilePic"
    accept="image/*"
    onChange={handleProfilePicUpload}
    hidden
  />
  <div className="profile-info">
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
      />
    </label>
    <label>
      Bio:
      <textarea
        name="bio"
        value={bio}
        onChange={handleBioChange}
      />
    </label>
  </div>
</div>

      {/* User Information Section */}
      <div className="user-info">

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </label>
        
       
        <label>LinkedIn:
                <input
                    type="url"
                    name="Linkedin Link"
                    placeholder="https://link.ca"
                    value={LinkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                />
                </label>
                <label>Github:
                <input
                    type="url"
                    name="GitHub Link"
                    placeholder="https://link.ca"
                    value={Github}
                    onChange={(e) => setGithub(e.target.value)}
                />
                </label>
                <label> Portfolio:
                <input
                    type="url"
                    name="Portfolio Link"
                    placeholder="https://link.ca"
                    value={Portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                />
                </label>
                <label>
  School:
  <select
    name="school"
    value={school} 
    onChange={handleSchoolChange}
  >
    {Schools.map((school, index) => (
      <option key={index} value={school}>
        {school}
      </option>
    ))}
  </select>
</label>
        <label>
          Caffeine:
          <select
            name="Choice of Caffeine"
            value={caffeine}
            onChange={handleCaffeineChange}
          >
            {Caffeine.map((caffeine, index) => (
              <option key={index} value={caffeine}>
                {caffeine}
              </option>
            ))}
          </select>
                  </label>

          <label>
          Day or Night:
          <select
            type="text"
            name="Early bird or night owl:"
            value={dayornight}
            onChange={handleDayorNightChange}
          >
             <option value="Early bird">Early Bird</option>
             <option value="Night Owl">Night Owl</option>
          </select>
          </label>
          <label>
          Focus:
          <select
            type="text"
            name="focus"
            value={focus}
            onChange={handleFocusChange}
          >
             <option value="Front End">Front End</option>
             <option value="Back End">Back End</option>
             <option value="Full Stack">Full Stack</option>
          </select>
        </label>
        <label>
        Year:
        <select
            name="Year"
            value={year}
            onChange={handleYearChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4+">4+</option>
          </select>
          </label>
        <label>
          Favourite Programming language:
          <select
            name="favouriteLanguage"
            value={favouriteLanguage}
            onChange={handleLanguageChange}
          >
            {programmingLanguages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>

        <label>
          Go-to Midnight Snack:
          <input
            type="text"
            name="midnightsnack"
            value={midnightsnack}
            onChange={handleSnackChange}
          />
        </label>

        <label>
          What sorting algorithm are you?:
          <input
            type="text"
            name="sortingalgorithm"
            value={algorithm}
            onChange={handleAlgorithmChange}
          />
        </label>

        <label>
          What's your favourite song?:
          <input
            type="text"
            name="song"
            value={song}
            onChange={handleSongChange}
          />
        </label>

        <label>
          What's your coolest hobby?:
          <input
            type="text"
            name="hobby"
            value={hobby}
            onChange={handleHobbyChange}
          />
        </label>

        
      </div>

      {/* Save and Logout Buttons */}
      <div className="button-group">
        <button className="save-button" onClick={handleSubmit}>
          Save Changes
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <footer className='menus'>
        <div className='menu'><Link to='/home' ><IoHome className='menuIcon'/></Link></div>
        <div className='menu'><FaPeopleArrows className='menuIcon'/></div>
        <div className='menu'><BiSolidMessageSquareDetail className='menuIcon'/></div>
        <div className='menu'><Link to='/AccountSettings'><CgProfile className='menuIcon'/></Link></div>
      </footer>

    </div>
  );
};

export default AccountSettings;