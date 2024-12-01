import './home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCheck, FaTimes, FaUndoAlt } from "react-icons/fa";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { IoSunny, IoMoon, IoLogoJavascript } from "react-icons/io5";
import { FaJava, FaPython } from "react-icons/fa";
import { TbHtml } from "react-icons/tb";
import { db } from "../firebase.js";
import { getDocs, collection, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const Home = () => {
  const [persons, setPersons] = useState([]);
  const [personIndex, setPersonIndex] = useState(0);
  const [isNo, setIsNo] = useState(false);
  const [isYes, setIsYes] = useState(false);
  const [isUndoY, setIsUndoY] = useState(false);
  const [isUndoN, setIsUndoN] = useState(false);

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
            email: doc.id,
            algorithm: data.algorithm, // Add algorithm
            midnightSnack: data.midnightsnack, // Add midnight snack
            favoriteSong: data.song, // Add favorite song
            coolestHobby: data.hobby, // Add coolest hobby
            name: data.firstName + " " + data.lastName || 'No Name',
          };
        });

        // Exclude the current user from the list
        const filteredUsers = usersList.filter(user => user.email !== currentUserEmail);
        setPersons(filteredUsers);
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

  const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

  const caffeine = (person) => {
    if (person.caffeine === 'coffee') {
      return <PiCoffeeBeanFill className='thingIcon' />;
    } else if (person.caffeine === 'energy drink') {
      return <SlEnergy className='thingIcon' />;
    }
  };

  const codingTime = (person) => {
    if (person.codingTime === 'day') {
      return <IoSunny className='thingIcon' />;
    } else if (person.codingTime === 'night') {
      return <IoMoon className='thingIcon' />;
    }
  };

  const language = (person) => {
    if (person.language === 'js') {
      return <IoLogoJavascript className='thingIcon' />;
    } else if (person.language === 'python') {
      return <FaPython className='thingIcon' />;
    } else if (person.language === 'java') {
      return <FaJava className='thingIcon' />;
    } else if (person.language === 'html') {
      return <TbHtml className='thingIcon' />;
    }
  };

  return (
    <div className='home'>
      <header className="logos">
        <div className='hackwesternLogo'></div>
        <div className='hackmatchLogo'></div>
      </header>

      <div className="stories">
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            className="story"
            onClick={() => alert(`You clicked on story ${id}`)}
          >
            {id}
          </div>
        ))}
      </div>

      {persons.length > 0 && (
        <div className={`show`}>
          <div className="bitmoji">Bitmoji Content</div>
          <p className="name">{persons[personIndex]?.name}</p>
          <div className="things">
            <div className='thing'>{caffeine(persons[personIndex])}</div>
            <div className='thing'>{codingTime(persons[personIndex])}</div>
            <div className='thing'>{language(persons[personIndex])}</div>
            <div className='thing'><p>{persons[personIndex].school}</p></div>
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
