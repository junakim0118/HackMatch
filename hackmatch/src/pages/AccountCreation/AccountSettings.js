import { IoHome } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AccountSettings.css";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyBFCkPH2ZbloXAo4rpztmCPQe0zoFiopXQ",
    authDomain: "hackmatch-9fef5.firebaseapp.com",
    projectId: "hackmatch-9fef5",
    storageBucket: "hackmatch-9fef5.appspot.com",
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

    const navigate = useNavigate();

    // Fetch authenticated user's email
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                setEmail(user.email);
            } else {
                console.log("No authenticated user found.");
                navigate("/login"); // Redirect to login if no user is found
            }
        });
        return () => unsubscribe();
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
                        setName(`${data.firstName || ""} ${data.lastName || ""}`);
                        setLinkedIn(data.LinkedIn || "");
                        setGithub(data.github || "");
                        setPortfolio(data.portfolio || "");
                        setBio(data.bio || "");
                        setYear(data.year || "");
                        setDayorNight(data.daynight || "");
                        setFocus(data.frontback || "");
                        setMidnightsnack(data.midnightsnack || "");
                        setAlgorithm(data.algorithm || "");
                        setSong(data.song || "");
                        setHobby(data.hobby || "");
                        setLanguage(data.lang || "");
                        setCaffeine(data.fuel || "");
                        setSchool(data.school || "");
                    } else {
                        alert("No such document in Firestore!");
                    }
                } catch (error) {
                    alert("Error fetching user data:", error);
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
                daynight: dayornight,
                frontback: focus,
                midnightsnack,
                algorithm,
                song,
                hobby,
                lang: favouriteLanguage,
                fuel: caffeine,
                school,
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
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout error:", error);
                alert("Error logging out.");
            });
    };

    const programmingLanguages = [
        "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Rust",
        "Kotlin", "Swift", "PHP", "TypeScript", "Scala", "Perl", "R", "Haskell",
    ];
    const Schools = ["Western", "McMaster", "Laurier", "Queens"];
    const Caffeine = ["Coffee", "Brewed tea", "Energy Drinks", "No caffeine", "Matcha", "Sugar"];

    return (
        <div className="signup">
            <h1>Account Settings</h1>

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
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setProfilePic(URL.createObjectURL(file));
                    }}
                    hidden
                />
                <div className="profile-info">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Bio:
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
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
                        value={email}
                        disabled
                    />
                </label>
                <label>
                    LinkedIn:
                    <input
                        type="url"
                        value={LinkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                    />
                </label>
                <label>
                    Github:
                    <input
                        type="url"
                        value={Github}
                        onChange={(e) => setGithub(e.target.value)}
                    />
                </label>
                <label>
                    Portfolio:
                    <input
                        type="url"
                        value={Portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                    />
                </label>
                <label>
                    School:
                    <select
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
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
                        value={caffeine}
                        onChange={(e) => setCaffeine(e.target.value)}
                    >
                        {Caffeine.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Day or Night:
                    <select
                        value={dayornight}
                        onChange={(e) => setDayorNight(e.target.value)}
                    >
                        <option value="day">Day</option>
                        <option value="night">Night</option>
                    </select>
                </label>
                <label>
                    Focus:
                    <select
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                    >
                        <option value="Front End">Front End</option>
                        <option value="Back End">Back End</option>
                        <option value="Full Stack">Full Stack</option>
                    </select>
                </label>
                <label>
                    Year:
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        {[1, 2, 3, 4, "4+"].map((yr, index) => (
                            <option key={index} value={yr}>
                                {yr}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Favorite Language:
                    <select
                        value={favouriteLanguage}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        {programmingLanguages.map((lang, index) => (
                            <option key={index} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Submit and Logout */}
            <div className="actions">
                <button onClick={handleSubmit}>Update Settings</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default AccountSettings;
