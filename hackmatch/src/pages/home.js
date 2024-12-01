import './home.css';
import { useState, Image } from 'react';
import {Link} from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";

import { PiCoffeeBeanFill } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";

import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { TbHtml } from "react-icons/tb";
import { SiCsswizardry } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";

const Home = () => {

  const [name, setName] = useState('juna kim');
  const [personIndex, setPersonIndex] = useState(0);

  const persons = [
    { name: 'Juna Kim', caffeine: 'coffee', codingTime: 'night', language: 'js', school: 'Western' }, //do status of no, yes, matched
    { name: 'Millicent Song', caffeine: 'energy drink', codingTime: 'day', language: 'python', school: 'Mac' },
    { name: 'Nathan Wan', caffeine: 'coffee', codingTime: 'night', language: 'java', school: 'Laurier' },
    { name: 'Jenusan Yogarajah', caffeine: 'coffee', codingTime: 'night', language: 'html', school: 'Queens' },
    // Add more persons as needed
  ];

  
    const handleStoryClick = (id) => alert(`You clicked on story ${id}`);
    const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const [isNo, setIsNo] = useState(false);

  const leftToggleCard = async () => {
    setIsNo(!isNo);
    await delay(400);
    setIsNo(isNo);
    if (personIndex < persons.length - 1) {
      setPersonIndex(personIndex + 1); // Move to the next person
      setName(persons[personIndex + 1].name); // Update name to the next person's name
    }
  };
  
  const [isUndoY, setIsUndoY] = useState(false);
  const [isUndoN, setIsUndoN] = useState(false);
const undoToggleCardY = async () => {
  setIsUndoY(!isUndoY);
        await delay(400);
        setIsUndoY(isUndoY);
}
const undoToggleCardN = async () => {
  setIsUndoN(!isUndoN);
        await delay(400);
        setIsUndoN(isUndoN);
}
  const undoToggleCard = async () => {
    if (personIndex > 0) {
      
      if (isNo && !isYes){
        undoToggleCardY();
        
      } else if (isYes && !isNo){
        undoToggleCardN();
      }
      setPersonIndex(personIndex - 1); // Move to the next person
      setName(persons[personIndex - 1].name); // Update name to the next person's name
    }
  };
  const [isYes, setIsYes] = useState(false);

  const rightToggleCard = async () => {
    setIsYes(!isYes);
    await delay(400);
    setIsYes(isYes);
    if (personIndex < persons.length - 1) {
      setPersonIndex(personIndex + 1); // Move to the next person
      setName(persons[personIndex + 1].name); // Update name to the next person's name
    }
  };

  function caffeine(person){
    if(person.caffeine === 'coffee'){
      return <PiCoffeeBeanFill className='thingIcon'/>;
    } else if (person.caffeine ==='energy drink'){
      return <SlEnergy className='thingIcon'/>;
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
    if(person.language === 'js'){
      return <IoLogoJavascript className='thingIcon'/>;
    } else if (person.language ==='python'){
      return <FaPython className='thingIcon'/>;
    } else if (person.language ==='java'){
      return <FaJava className='thingIcon'/>; 
    }else if (person.language ==='html'){
      return <TbHtml className='thingIcon'/>; 
    }
  };
  function school(person){
    if(person.school === 'Western'){
      return <img src={'./western.png'} className='thingIcon'/>;
    } else if (person.school ==='Mac'){
      return <img src={'./mac.png'} className='thingIcon'/>;
    } else if (person.school ==='Laurier'){
      return <img src={'./laurier.png'} className='thingIcon'/>;
    }else if (person.school ==='Queens'){
      return <img src={'./queens.png'} className='thingIcon'/>;
    }
  };
    return (
        <div className='home'>
          <header className="logos">
<div className='hackwesternLogo'></div>
<div className='hackmatchLogo'></div>
</header>
      {/* Stories Section */}
      <div className="stories">
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            className="story"
            onClick={() => handleStoryClick(id)}
          >
            {id}
          </div>
        ))}
      </div>

      {/* Person Section */}
      {persons.map((person, index) => (
          <div
            key={index}
            className={`person ${index === personIndex ? 'show' : 'hide'} ${isUndoY ? 'yes' : isUndoN ? 'no' : isNo ? 'no' : isYes ? 'yes': ''}`}
          >
        <div className="bitmoji">Bitmoji Content</div>

      {/* Name Section */}
      <p className="name">Name: {name}</p>
      {/* Things Section */}
      <div className="things">
        <div className='thing'>{caffeine(person)}</div>
        <div className='thing'>{codingTime(person)}</div>
        <div className='thing'>{language(person)}</div>
        <div className='thing'>{school(person)}</div>
      </div>
</div>))}
      
      
      {/* Choose Section */}
      <div className="choose">
    
          <div
            className="choiceNo"
            onClick={leftToggleCard}
          >
            {isNo ? <FaTimes  className='choiceIcons'/> : <FaTimes  className='choiceIcons'/>}
          </div>
          <div
            className="choiceUndo"
            onClick={undoToggleCard}
          >
            {isUndoY ? <FaUndoAlt className='choiceIcons'/> : <FaUndoAlt className='choiceIcons'/>}
          </div>
          <div
            className="choiceYes"
            onClick={rightToggleCard}
          >
            {isYes ? <FaCheck className='choiceIcons'/> : <FaCheck className='choiceIcons'/>}
          </div>
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
  
  export default Home;