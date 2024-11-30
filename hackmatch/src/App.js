import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Name from "./pages/AccountCreation/Name.js";
import Links from "./pages/AccountCreation/Links.js";
import Bio from "./pages/AccountCreation/bio.js";
import Fun from "./pages/AccountCreation/fun.js";
// import Signup from "./pages/Signup"; // Your Signup component
// import AccountCreation from "./pages/AccountCreation"; // Your AccountCreation component
import Home from "./pages/home";
// import Signup from "./pages/Signup"; // Your Signup component
// import AccountCreation from "./pages/AccountCreation"; // Your AccountCreation component
// import Home from "./pages/home";
import Account from "./pages/AccountPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Name" element={<Name />} />
        <Route path="/Links" element={<Links />} />
        <Route path="/Bio" element={<Bio />} />
        <Route path="/Fun" element={<Fun />} />
        <Route path="/" element={<Home />} />
        <Route path="/Account" element={<Account />} />
        {/* <Route path="/accountCreation" element={<AccountCreation />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
