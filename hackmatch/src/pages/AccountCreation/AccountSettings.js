
import { IoHome } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AccountSettings.css";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

import pic1 from "../../images/characters/character.jpg";
import pic2 from "../../images/characters/char2.jpg";
import pic3 from "../../images/characters/char3.png";
import pic4 from "../../images/characters/char4.png";

// Firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyBFCkPH2ZbloXAo4rpztmCPQe0zoFiopXQ",
    authDomain: "hackmatch-9fef5.firebaseapp.com",
    projectId: "hackmatch-9fef5",
    storageBucket: "hackmatch-9fef5.firebasestorage.app",
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

const email = localStorage.getItem("email");


const AccountSettings = () => {

        // const [selectedOption, setSelectedOption] = useState(""); // Dropdown state
const [selectedItem, setSelectedItem] = useState(null);
          const items = [
    { id: 1, name: "Character 1", img: pic1 },
    { id: 2, name: "Character 2", img: pic2 },
    { id: 3, name: "Character 3", img: pic3 },
    { id: 4, name: "Character 4", img: pic4 },
  ];

  const handleSelect = (item) => {
    setSelectedItem(item);
  };


  const [isOpen, setIsOpen] = useState(false);
   const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown visibility
  };

  

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

//     // Handles profile picture upload
// const handleProfilePicUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//         setProfilePic(URL.createObjectURL(file)); // Previews uploaded image
//     }
// };

// Handles name input

const handleSchoolChange = (e) =>{
    setSchool(e.target.value);
};
const handleNameChange = (e) => {
    setName(e.target.value);
};

// Handles bio input
const handleBioChange = (e) => {
    setBio(e.target.value);
};

// Handles caffeine selection
const handleCaffeineChange = (e) => {
    setCaffeine(e.target.value);
};

// Handles day/night selection
const handleDayorNightChange = (e) => {
    setDayorNight(e.target.value);
};

// Handles focus selection
const handleFocusChange = (e) => {
    setFocus(e.target.value);
};

// Handles year selection
const handleYearChange = (e) => {
    setYear(e.target.value);
};

// Handles language selection
const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
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

// Handles logout functionality
const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/login"); // Redirect to login page (replace with your route)
};

    const navigate = useNavigate();

    // Fetch user data when the component mounts
    useEffect(() => {
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
                    setEmail(data.email || "");
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
    }, []);

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


    //programming languages array
    const programmingLanguages = [
        "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Rust",
        "Kotlin", "Swift", "PHP", "TypeScript", "Scala", "Perl", "R", "Haskell",
      ];
      const Schools = ["Western", "McMaster", "Laurier", "Queens"];
      const Caffeine =["Coffee","Brewed tea","Energy Drinks","No caffeine","Matcha","Sugar"]

  return (
    <div className="signup">
      <h1>Account Settings</h1>

      {/* Profile Picture Section */}
<div className="profile-pic-section">
  <label htmlFor="profilePic">
    {/* <img
      src={profilePic || "https://via.placeholder.com/150"}
      alt="Profile"
      className="profile-pic"
    /> */}
    <div style={{ width: "200px", margin: "0 auto", position: "relative" }}>
      {/* Dropdown button */}
      <div
        onClick={toggleDropdown}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {selectedItem ? (
            <>
              <img
                src={selectedItem.img}
                alt={selectedItem.name}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              {selectedItem.name}
            </>
          ) : (
            "Select a character:"
          )}
        </div>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginTop: "5px",
            zIndex: 1000,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => handleSelect(item)}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  </label>
  {/* <input
    type="file"
    id="profilePic"
    accept="image/*"
    onChange={handleProfilePicUpload}
    hidden
  /> */}
  {/* <select
            id="dropdown"
            className="dropdown"
            value={selectedOption}
            onChange={
                (e) => setSelectedOption(e.target.value)
                // handleProfilePicUpload;
                
            }
          >
            <option value="" disabled>Select an option</option>
            <option value="1">
                <img src={pic1} alt="Profile" className="profile-pic" />
            </option>
            <option value="2">
                <img src={pic2} alt="Profile" className="profile-pic" />
            </option>
            <option value="3">
                <img src={pic3} alt="Profile" className="profile-pic" />
            </option>
             <option value="4">
                <img src={pic4} alt="Profile" className="profile-pic" />
            </option>
          </select> */}
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