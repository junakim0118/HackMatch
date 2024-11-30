import './fun.css';
import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom'; 

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

function Fun() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [lang, setLang] = useState('');
    const [school, setSchool] = useState('');
    const [year, setYear] = useState('');
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);

    // States for both switches
    const [dayNightMode, setDayNightMode] = useState('day'); // 'day' or 'night'
    const [frontBackMode, setFrontBackMode] = useState('frontend'); // 'frontend' or 'backend'

    const programmingLanguages = [
        "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Rust",
        "Kotlin", "Swift", "PHP", "TypeScript", "Scala", "Perl", "R", "Haskell"
    ];
    const Schools = ["Western", "McMaster", "Laurier", "Queens"];
    const YearOptions = [1, 2, 3, 4, "4+"];

    const handleLangChange = (e) => {
        const input = e.target.value;
        setLang(input);

        const matches = programmingLanguages.filter(lang =>
            lang.toLowerCase().includes(input.toLowerCase())
        );
        matches.sort((a, b) =>
            a.toLowerCase().indexOf(input.toLowerCase()) - b.toLowerCase().indexOf(input.toLowerCase())
        );

        setFilteredLanguages(matches);
    };

    const handleSchoolChange = (e) => {
        const input = e.target.value;
        setSchool(input);

        const matches = Schools.filter(lang =>
            lang.toLowerCase().includes(input.toLowerCase())
        );
        matches.sort((a, b) =>
            a.toLowerCase().indexOf(input.toLowerCase()) - b.toLowerCase().indexOf(input.toLowerCase())
        );

        setFilteredSchools(matches);
    };

    const handleLanguageClick = (language) => {
        setLang(language);
        setFilteredLanguages([]);
    };

    const handleSchoolClick = (school) => {
        setSchool(school);
        setFilteredSchools([]);
    };

    // Toggle Day/Night
    const handleDayNightChange = (e) => {
        setDayNightMode(e.target.value);
    };

    // Toggle Frontend/Backend
    const handleFrontBackChange = (e) => {
        setFrontBackMode(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        localStorage.setItem("day/night", dayNightMode);
        localStorage.setItem("front/back", frontBackMode);
        localStorage.setItem("year", year);
        localStorage.setItem("lang", lang);
        localStorage.setItem("school", school);

        // Create the document in Firestore
        try {
            await setDoc(doc(db, "Users", email), {
                firstName: localStorage.getItem("firstName"),
                lastName: localStorage.getItem("lastName"),
                LinkedIn: localStorage.getItem("linkedIn"),
                github: localStorage.getItem("github"),
                portfolio: localStorage.getItem("portfolio"),
                bio: localStorage.getItem("bio"),
                daynight: dayNightMode,
                frontback: frontBackMode,
                lang:lang,
                school:school
            });

            alert("Uploaded to fb, no next page");

            //navigate("/Fun");
        } catch (err) {
            alert(err.message);
        }

        setLoading(false);
    };

    return (
        <div className='signup'>
        <div className="form-container">
            <h1>Who are you???</h1>

            {/* Day/Night Selector */}
            <div className="radio-group">
                <p>Choose your mode:</p>
                <label className="radio-label">
                    <input 
                        type="radio" 
                        value="day" 
                        checked={dayNightMode === 'day'} 
                        onChange={handleDayNightChange} 
                        className="radio-input"
                    />
                    Day
                </label>
                <label className="radio-label">
                    <input 
                        type="radio" 
                        value="night" 
                        checked={dayNightMode === 'night'} 
                        onChange={handleDayNightChange} 
                        className="radio-input"
                    />
                    Night
                </label>
            </div>

            {/* Frontend/Backend Selector */}
            <div className="radio-group">
                <p>Choose your focus:</p>
                <label className="radio-label">
                    <input 
                        type="radio" 
                        value="frontend" 
                        checked={frontBackMode === 'frontend'} 
                        onChange={handleFrontBackChange} 
                        className="radio-input"
                    />
                    Frontend
                </label>
                <label className="radio-label">
                    <input 
                        type="radio" 
                        value="backend" 
                        checked={frontBackMode === 'backend'} 
                        onChange={handleFrontBackChange} 
                        className="radio-input"
                    />
                    Backend
                </label>
            </div>

            {/* Year Dropdown */}
            <div className="form-group">
                <p>What year are you in?</p>
                <select 
                    value={year} 
                    onChange={handleYearChange} 
                    className="input-field"
                >
                    <option value="">Select Year</option>
                    {YearOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <p>What's your favorite language to code in?</p>
                    <input
                        type="text"
                        placeholder="Language"
                        value={lang}
                        onChange={handleLangChange}
                        className="input-field"
                    />
                    {filteredLanguages.length > 0 && (
                        <ul className="suggestions">
                            {filteredLanguages.map((language, index) => (
                                <li
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleLanguageClick(language)}
                                >
                                    {language}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="form-group">
                    <p>What school do you go to?</p>
                    <input
                        type="text"
                        placeholder="School"
                        value={school}
                        onChange={handleSchoolChange}
                        className="input-field"
                    />
                    {filteredSchools.length > 0 && (
                        <ul className="suggestions">
                            {filteredSchools.map((school, index) => (
                                <li
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSchoolClick(school)}
                                >
                                    {school}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


               <Link to="/AccountSettings">
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...': ''}
                    Submit
                </button>
                </Link>

            </form>
        </div>
        </div>
    );
}

export default Fun;
