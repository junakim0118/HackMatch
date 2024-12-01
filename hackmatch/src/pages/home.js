import './home.css';
import { useState, useEffect, Image } from 'react';
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCheck, FaTimes, FaUndoAlt } from "react-icons/fa";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { TbTeapot } from "react-icons/tb";
import { SlEnergy } from "react-icons/sl";
import { IoSunny, IoMoon, IoLogoJavascript } from 'react-icons/io5';
import { FaPython, FaJava } from 'react-icons/fa';

import { db } from "../firebase.js";
import { getDocs, collection, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { CiNoWaitingSign } from "react-icons/ci";
import { MdLocalDrink } from "react-icons/md";
import { FaCubes } from "react-icons/fa";

import { SiRuby } from "react-icons/si";
import { FaRust } from "react-icons/fa";
import { SiKotlin } from "react-icons/si";
import { FaSwift } from "react-icons/fa";
import { SiPhp } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { DiScala } from "react-icons/di";
import { SiHaskell } from "react-icons/si";

import pic1 from "../images/characters/character.jpg";
import pic2 from "../images/characters/char2.jpg";
import pic3 from "../images/characters/char3.png";
import pic4 from "../images/characters/char4.png";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Home = () => {
  const [persons, setPersons] = useState([]);
  const [personIndex, setPersonIndex] = useState(0);
  const [isNo, setIsNo] = useState(false);
  const [isYes, setIsYes] = useState(false);
  const [isUndoY, setIsUndoY] = useState(false);
  const [isUndoN, setIsUndoN] = useState(false);

  const imageMap = {
    1: pic1,
    2: pic2,
    3: pic3,
    4: pic4,
  };

  const auth = getAuth(); // Get the authentication instance
  const currentUserEmail = auth.currentUser?.email;

  // Fetch users excluding the current user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "Users"));
        const usersList = usersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            character: data.character,
            email: doc.id,  // Use document ID as email
            caffeine: data.fuel,
            codingTime: data.daynight,
            language: data.lang,
            school: data.school,
            name: data.firstName + " " + data.lastName || 'No Name', // Default to 'No Name' if not available
          };
        });

        // Exclude the current user from the list
        const filteredUsers = usersList.filter(user => user.email !== currentUserEmail);
        setPersons(filteredUsers);
        console.log(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (currentUserEmail) {
      fetchUsers();
    }
  }, [currentUserEmail]);

  // Handle the "No" button click
  const leftToggleCard = async () => {
    setIsNo(!isNo);
    await delay(400);
    if (personIndex < persons.length - 1) {
      setPersonIndex(personIndex + 1);
    }
  };

  // Handle the "Yes" button click
  const rightToggleCard = async () => {
    setIsYes(!isYes);
    await delay(400);
    if (personIndex < persons.length - 1) {
      setPersonIndex(personIndex + 1);
    }

    if (!currentUserEmail) {
      console.error("No user is currently authenticated.");
      return;
    }

    const currentUserRef = doc(db, "Users", currentUserEmail);
    const otherUserEmail = persons[personIndex].email;
    const otherUserRef = doc(db, "Users", otherUserEmail);

    // Update likes for the current user
    await updateDoc(currentUserRef, {
      likes: arrayUnion(otherUserEmail),
    });

    // Check if the other user likes the current user
    const otherUserDoc = await getDoc(otherUserRef);
    if (otherUserDoc.exists()) {
      const otherUserLikes = otherUserDoc.data().likes || [];
      if (otherUserLikes.includes(currentUserEmail)) {
        // Match found: update matches for both users
        await updateDoc(currentUserRef, {
          matches: arrayUnion(otherUserEmail),
        });
        await updateDoc(otherUserRef, {
          matches: arrayUnion(currentUserEmail),
        });

        alert("Match");
      }
    }
  };

  // Handle the "Undo" button click
  const undoToggleCard = async () => {
    if (personIndex > 0) {
      if (isNo && !isYes) {
        undoToggleCardY();
      } else if (isYes && !isNo) {
        undoToggleCardN();
      }
      setPersonIndex(personIndex - 1);
    }
  };

  const undoToggleCardY = async () => {
    setIsUndoY(!isUndoY);
    await delay(400);
  };
  const undoToggleCardN = async () => {
    setIsUndoN(!isUndoN);
    await delay(400);
  };

  function caffeine(person){
    if(person.caffeine === 'Coffee'){
      return <PiCoffeeBeanFill className='thingIcon'/>;
    } else if (person.caffeine ==='Brewed tea'){
      return <TbTeapot className='thingIcon'/>;
    } else if (person.caffeine ==='Energy Drinks'){
      return <SlEnergy className='thingIcon'/>;
    }else if (person.caffeine ==='No caffeine'){
      return <CiNoWaitingSign className='thingIcon'/>;
    }else if (person.caffeine ==='Matcha'){
      return <MdLocalDrink className='thingIcon'/>;
    }else if (person.caffeine ==='Sugar'){
      return <FaCubes className='thingIcon'/>;
    }
  };

  function codingTime(person){
    if(person.codingTime === 'day'){
      return <IoSunny className='thingIcon'/>;
    } else if (person.codingTime ==='night'){
      return <IoMoon className='thingIcon'/>;
    }
  };

  function language(person){
    if(person.language === 'JavaScript'){
      return <IoLogoJavascript className='thingIcon'/>;
    } else if (person.language ==='Python'){
      return <FaPython className='thingIcon'/>;
    } else if (person.language ==='Java'){
      return <FaJava className='thingIcon'/>; 
    }else if (person.language ==='C#'){
      return <div className='thingIcon'>C#</div>; 
    }else if (person.language ==='C++'){
      return <div className='thingIcon'>C++</div>; 
    }else if (person.language ==='Ruby'){
      return <SiRuby className='thingIcon'/>;
    }else if (person.language ==='Go'){
      return <div className='thingIcon'>Go</div>; 
    }else if (person.language ==='Rust'){
      return <FaRust className='thingIcon'/>;
    }else if (person.language ==='Kotlin'){
      return <SiKotlin className='thingIcon'/>;
    }else if (person.language ==='Swift'){
      return <FaSwift className='thingIcon'/>;
    }else if (person.language ==='PHP'){
      return <SiPhp className='thingIcon'/>; 
    }else if (person.language ==='TypeScript'){
      return <BiLogoTypescript className='thingIcon'/>; 
    }else if (person.language ==='Scala'){
      return <DiScala className='thingIcon'/>; 
    }else if (person.language ==='Perl'){
      return <div className='thingIcon'>Perl</div>; 
    }else if (person.language ==='R'){
      return <div className='thingIcon'>R</div>; 
    }else if (person.language ==='Haskell'){
      return <SiHaskell className='thingIcon'/>; 
    }
  };
  function school(person){
    if(person.school == 'Western University'){
      return <img src={'./western.png'} className='thingIcon'/>;
    } else if (person.school =='McMaster University'){
      return <img src={'./mac.png'} className='thingIcon'/>;
    } else if (person.school =='Laurier'){
      return <img src={'./laurier.png'} className='thingIcon'/>;
    }else if (person.school ==`Queen's University`){
      return <img src={'./queens.png'} className='thingIcon'/>;
    }else if (person.school =='University of Toronto'){
      return <img src={'./uoft.png'} className='thingIcon'/>;
    }else if (person.school =='University of Waterloo'){
      return <img src={'./waterloo.png'} className='thingIcon'/>;
    }
  };

    return (
        <div className='home'>
          <header className="logos">
<div className='hackwesternLogo'></div>
<div className='hackmatchLogo'></div>
</header>
      {persons.length > 0 && (

        <div className={`show`}>
          <img
                src={imageMap[persons[personIndex]?.character]}
                style={{ width: "100%", height: "auto", marginRight: "10px", borderRadius: "2em" }}
              />



          <p className="name">{persons[personIndex]?.name}</p>
          <div className="things">
            <div className='thing'>{caffeine(persons[personIndex])}</div>
            <div className='thing'>{codingTime(persons[personIndex])}</div>
            <div className='thing'>{language(persons[personIndex])}</div>
            <div className='thing'>{school(persons[personIndex])}</div>

          </div>
        </div>
      )}

      <div className="choose">
        <div className="choiceNo" onClick={leftToggleCard}>
          <FaTimes className='choiceIcons' />
        </div>
        <div className="choiceUndo" onClick={undoToggleCard}>
          <FaUndoAlt className='choiceIcons' />
        </div>
        <div className="choiceYes" onClick={rightToggleCard}>
          <FaCheck className='choiceIcons' />
        </div>
      </div>

      <footer className='menus'>
        <div className='menu'><Link to='/home'><IoHome className='menuIcon' /></Link></div>
        <div className='menu'><Link to='/Temp'><BiSolidMessageSquareDetail className='menuIcon' /></Link></div>
        <div className='menu'><Link to='/AccountSettings'><CgProfile className='menuIcon' /></Link></div>

      </footer>
    </div>
  );
};

export default Home;
