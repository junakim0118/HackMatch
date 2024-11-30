import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';  // Your Signup component
import AccountCreation from './pages/AccountCreation';  // Your AccountCreation component
import Launch from './pages/Launch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/accountCreation" element={<AccountCreation />} />
        <Route path ="/Signup" element ={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
