import './home.css';

const Home = () => {
    const handleStoryClick = (id) => alert(`You clicked on story ${id}`);
  const handleChoiceClick = (id) => alert(`You selected choice ${id}`);
  let name = 'juna kim';
  let caffeine = 'coffee';
  let codingTime = 'night';
  let language = 'js';
  let school = 'western';
    return (
        <div>
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
      <div className="person">
        <div className="bitmoji">Bitmoji Content</div>

      {/* Name Section */}
      <p className="name">Name: {name}</p>
      {/* Things Section */}
      <div className="things">
        <div className='thing'><p>{caffeine}</p></div>
        <div className='thing'><p>{codingTime}</p></div>
        <div className='thing'><p>{language}</p></div>
        <div className='thing'><p>{school}</p></div>
      </div>
      </div>
      {/* Choose Section */}
      <div className="choose">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="choice"
            onClick={() => handleChoiceClick(id)}
          >
            {id}
          </div>
        ))}
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