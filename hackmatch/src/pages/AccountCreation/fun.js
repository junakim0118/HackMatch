import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

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
    const [dayNightMode, setDayNightMode] = useState(1); // 1 for Day, 0 for Night
    const [frontBackMode, setFrontBackMode] = useState(1); // 1 for Frontend, 0 for Backend

    const programmingLanguages = [
        "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Rust",
        "Kotlin", "Swift", "PHP", "TypeScript", "Scala", "Perl", "R", "Haskell"
    ];
    const Schools = ["Western", "Mac", "Laurier", "Queens"];
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
    const toggleDayNight = () => {
        setDayNightMode(prevMode => (prevMode === 1 ? 0 : 1)); // 1 for Day, 0 for Night
    };

    // Toggle Frontend/Backend
    const toggleFrontBack = () => {
        setFrontBackMode(prevMode => (prevMode === 1 ? 0 : 1)); // 1 for Frontend, 0 for Backend
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

            navigate("/Fun");
        } catch (err) {
            alert(err.message);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Who are you???</h1>
            
            {/* Day/Night Switch */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '10px' }}>Day</p>
                <div
                    onClick={toggleDayNight}
                    style={{
                        width: '60px',
                        height: '30px',
                        backgroundColor: '#ccc',
                        borderRadius: '15px',
                        display: 'flex',
                        justifyContent: dayNightMode === 1 ? 'flex-start' : 'flex-end',
                        alignItems: 'center',
                        padding: '5px',
                        cursor: 'pointer'
                    }}
                >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: dayNightMode === 1 ? '#FFD700' : '#000',
                            borderRadius: '50%'
                        }}
                    ></div>
                </div>
                <p style={{ marginLeft: '10px' }}>Night</p>
            </div>

            {/* Frontend/Backend Switch */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '10px' }}>Frontend</p>
                <div
                    onClick={toggleFrontBack}
                    style={{
                        width: '60px',
                        height: '30px',
                        backgroundColor: '#ccc',
                        borderRadius: '15px',
                        display: 'flex',
                        justifyContent: frontBackMode === 1 ? 'flex-start' : 'flex-end',
                        alignItems: 'center',
                        padding: '5px',
                        cursor: 'pointer'
                    }}
                >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: frontBackMode === 1 ? '#FFD700' : '#000',
                            borderRadius: '50%'
                        }}
                    ></div>
                </div>
                <p style={{ marginLeft: '10px' }}>Backend</p>
            </div>

            {/* Year Dropdown */}
            <div style={{ marginBottom: '20px' }}>
                <p>What year are you in?</p>
                <select value={year} onChange={handleYearChange} style={{ padding: '5px', fontSize: '14px' }}>
                    <option value="">Select Year</option>
                    {YearOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px', position: 'relative' }}>
                    <p>What's your favorite language to code in?</p>
                    <input
                        type="text"
                        placeholder="Language"
                        value={lang}
                        onChange={handleLangChange}
                    />
                    {filteredLanguages.length > 0 && (
                        <ul style={{
                            maxHeight: '150px',
                            overflowY: 'auto',
                            width: "10%"
                        }}>
                            {filteredLanguages.map((language, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee'
                                    }}
                                    onClick={() => handleLanguageClick(language)}
                                >
                                    {language}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={{ marginBottom: '10px', position: 'relative' }}>
                    <p>What school do you go to?</p>
                    <input
                        type="text"
                        placeholder="School"
                        value={school}
                        onChange={handleSchoolChange}
                    />
                    {filteredSchools.length > 0 && (
                        <ul style={{
                            maxHeight: '150px',
                            overflowY: 'auto',
                            width: "10%"
                        }}>
                            {filteredSchools.map((school, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee'
                                    }}
                                    onClick={() => handleSchoolClick(school)}
                                >
                                    {school}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Fun;
