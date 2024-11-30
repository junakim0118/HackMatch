import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';  // Your Signup component
import AccountCreation from './pages/AccountCreation';  // Your AccountCreation component
// import Launch from './pages/Launch';
function App() {
  return (
    <Router>
    <Routes>
      {/* <Route path = "/" Launch ={<Launch/>}/> */}
      <Route path = "/AccountCreation" element = {<AccountCreation/>}/>
      <Route path = "/Signup" element ={<Signup/>}/>
      <Route/>
    </Routes>
    </Router>
  );
}

export default App;
