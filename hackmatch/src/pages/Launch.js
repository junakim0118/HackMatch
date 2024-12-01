import React from 'react';
 import { useNavigate, Link } from 'react-router-dom'; 
import "./launch.css";
 import logo from "./{H A C K M A T C H}-2.png";


const Launch = () => {

     const navigate = useNavigate();
    
   return (
       <div className = "launch-page">
          { <img src = {logo} alt="Logo" className="logo"/> }
         <Link to="/Login">
           <button className="button1"onClick={()=>navigate('/Login')}>Create a new account :)</button>
          </Link>
         </div>

       );
}

export default Launch;
