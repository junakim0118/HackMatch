import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup'; 
import Name from './pages/AccountCreation/Name.js';  
import Links from './pages/AccountCreation/Links.js';  
import Bio from './pages/AccountCreation/bio.js';
import Fun from './pages/AccountCreation/fun.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Name" element={<Name />} />
        <Route path="/Links" element={<Links />} />
        <Route path="/Bio" element={<Bio />} />
        <Route path="/Fun" element={<Fun />} />
      </Routes>
    </Router>
  );
}

export default App;
