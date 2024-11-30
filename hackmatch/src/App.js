import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';  // Your Signup component
import AccountCreation from './pages/AccountCreation';  // Your AccountCreation component
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accountCreation" element={<AccountCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
