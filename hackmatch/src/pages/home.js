import './home.css';
import { useState } from 'react';

const Home = () => {

  const [name, setName] = useState('juna kim');
  const [personIndex, setPersonIndex] = useState(0);

  const persons = [
    { name: 'juna kim', caffeine: 'coffee', codingTime: 'night', language: 'js', school: 'western' }, //do status of no, yes, matched
    { name: 'person two', caffeine: 'tea', codingTime: 'day', language: 'python', school: 'eastern' },
    { name: 'person three', caffeine: 'juice', codingTime: 'evening', language: 'java', school: 'southern' },
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
    if (personIndex >= 0) {
      
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
  
    return (
        <div className='home'>
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
        <div className='thing'><p>{person.caffeine}</p></div>
        <div className='thing'><p>{person.codingTime}</p></div>
        <div className='thing'><p>{person.language}</p></div>
        <div className='thing'><p>{person.school}</p></div>
      </div>
</div>))}
      
      
      {/* Choose Section */}
      <div className="choose">
    
          <div
            className="choice"
            onClick={leftToggleCard}
          >
            {isNo ? 'x' : 'x'}
          </div>
          <div
            className="choice"
            onClick={undoToggleCard}
          >
            {isUndoY ? '-' : '-'}
          </div>
          <div
            className="choice"
            onClick={rightToggleCard}
          >
            {isYes ? 'y' : 'y'}
          </div>
      </div>
      
      <div className='menus'>
        <div className='menu'>home</div>
        <div className='menu'>match</div>
        <div className='menu'>message</div>
        <div className='menu'>profile</div>
      </div>

    </div>
    );
  };
  
  export default Home;