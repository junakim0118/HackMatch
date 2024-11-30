import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup"; // Your Signup component
import AccountCreation from "./pages/AccountCreation"; // Your AccountCreation component
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/accountCreation" element={<AccountCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
