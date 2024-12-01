import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js"
import Signup from "./pages/Signup";
import Name from "./pages/AccountCreation/Name.js";
import Links from "./pages/AccountCreation/Links.js";
import Bio from "./pages/AccountCreation/bio.js";
import Fun from "./pages/AccountCreation/fun.js";
import Home from "./pages/home";
import Temp from "./pages/temp.js"
import Chat from "./pages/messages.js"


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Temp" element={<Temp />} />
      <Route path="/Chat" element={<Chat />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Name" element={<Name />} />
        <Route path="/Links" element={<Links />} />
        <Route path="/Bio" element={<Bio />} />
        <Route path="/Fun" element={<Fun />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/accountCreation" element={<AccountCreation />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
