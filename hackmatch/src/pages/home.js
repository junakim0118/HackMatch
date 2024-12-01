import './home.css';
import { useState, Image } from 'react';
import {Link} from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";

import { PiCoffeeBeanFill } from "react-icons/pi";
import { TbTeapot } from "react-icons/tb";
import { SlEnergy } from "react-icons/sl";
import { CiNoWaitingSign } from "react-icons/ci";
import { MdLocalDrink } from "react-icons/md";
import { FaCubes } from "react-icons/fa";

import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";

import { SiRuby } from "react-icons/si";
import { FaRust } from "react-icons/fa";
import { SiKotlin } from "react-icons/si";
import { FaSwift } from "react-icons/fa";
import { SiPhp } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { DiScala } from "react-icons/di";
import { SiHaskell } from "react-icons/si";

const Home = () => {

  const [name, setName] = useState('juna kim');
  const [personIndex, setPersonIndex] = useState(0);

  const persons = [
    { name: 'Juna Kim', caffeine: 'Coffee', codingTime: 'Night', language: 'JavaScript', school: 'Western' }, //do status of no, yes, matched
    { name: 'Millicent Song', caffeine: 'Energy drink', codingTime: 'Day', language: 'Python', school: 'Mac' },
    { name: 'Nathan Wan', caffeine: 'Coffee', codingTime: 'Night', language: 'Java', school: 'Laurier' },
    { name: 'Jenusan Yogarajah', caffeine: 'No caffeine', codingTime: 'Night', language: 'TypeScript', school: 'Queens' },
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
    if(person.caffeine === 'Coffee'){
      return <PiCoffeeBeanFill className='thingIcon'/>;
    } else if (person.caffeine ==='Brewed tea'){
      return <TbTeapot className='thingIcon'/>;
    } else if (person.caffeine ==='Energy drink'){
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
    if(person.codingTime === 'Day'){
      return <IoSunny className='thingIcon'/>;
    } else if (person.codingTime ==='Night'){
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
      {/* <div className="stories">
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            className="story"
            onClick={() => handleStoryClick(id)}
          >
            {id}
          </div>
        ))}
      </div> */}

      {/* Person Section */}
      {persons.map((person, index) => (
          <div
            key={index}
            className={`person ${index === personIndex ? 'show' : 'hide'} ${isUndoY ? 'yes' : isUndoN ? 'no' : isNo ? 'no' : isYes ? 'yes': ''}`}
          >
        <div className="bitmoji"><Link to='/AccountPage' >Bitmoji Content</Link></div>

      {/* Name Section */}
      <p className="name">{name}</p>
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
        <div className='menu'><Link to='/temp'><BiSolidMessageSquareDetail className='menuIcon'/></Link></div>
        <div className='menu'><Link to='/AccountSettings'><CgProfile className='menuIcon'/></Link></div>
      </footer>

    </div>
    );
  };
  
  export default Home;