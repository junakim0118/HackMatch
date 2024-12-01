// import './stories.css';
// import React, { useState } from 'react';

// import { useNavigate, Link } from 'react-router-dom'; 

// // Firebase initialization
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// import story from "../images/pic1.jpeg";
// import story2 from "../images/pic2.jpeg";
// import story3 from "../images/pic3.jpeg";

// import { IoIosExit } from "react-icons/io";

// // Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyBFCkPH2ZbloXAo4rpztmCPQe0zoFiopXQ",
//   authDomain: "hackmatch-9fef5.firebaseapp.com",
//   projectId: "hackmatch-9fef5",
//   storageBucket: "hackmatch-9fef5.firebasestorage.app",
//   messagingSenderId: "520362196145",
//   appId: "1:520362196145:web:338074b520500558317690",
//   measurementId: "G-SZV8RS906G"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const email = localStorage.getItem('email'); 
// function Stories() {

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const navigate = useNavigate();
//         const handleExit = () => {
//         navigate(-1); // Navigate back to the previous page
//     };
//     const images = [story, story2, story3];

//    const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Go to the next image in a loop
//     };

//     const handlePrev = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Go to the previous image in a loop
//     };


//     let selection = 0;
//     let captions = ["Your Team!", "Dinner Time", "First drink", "First person to fall asleep!"]
//     return (
        
//          <div className="story-container">
//              {/* <button className="exit-button" onClick={handleExit}>X</button> */}
//              <IoIosExit className="exit-button" onClick={handleExit}/>
//                 <button className="arrow left-arrow" onClick={handlePrev}>&lt;</button>
//                     <div className="header">
//                  <h1 className="header-title">Stories!</h1> 
//                   <p className="header-text">{captions[0]}</p>  
//              </div>
//             <img src={images[currentIndex]} alt={`story-${currentIndex + 1}`} className="story-image" />
//             <button className="arrow right-arrow" onClick={handleNext}>&gt;</button> 
//          </div> 
        
//         );
// }

// export default Stories;
