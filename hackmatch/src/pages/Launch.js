import React from 'react';
 import { useNavigate, Link } from 'react-router-dom'; 
import "./launch.css";
 import logo from "./{H A C K M A T C H}-2.png";


const Launch = () => {

     const navigate = useNavigate();
    
   return (
       <div className = "launch-page">
          { <img src = {logo} alt="Logo" className="logo"/> }
         <Link to="/Signup">
           <button className="button1"onClick={()=>navigate('/Signup')}>Create a new account :)</button>
          </Link>

          <Link to="/Login">
          <button className ="button2" onClick ={()=>navigate('Login')}>Already have an account? Log in :)</button>
          </Link>
         </div>

       );
}

export default Launch;
