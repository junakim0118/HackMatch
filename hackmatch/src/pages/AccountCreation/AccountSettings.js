import React, { useState } from "react";
import {Link} from 'react-router-dom';
import "./AccountSettings.css";

const AccountSettings = () => {
  // State for editable user info
  const [userInfo, setUserInfo] = useState({
    name: "Millicent Song",
    email: "millicentsong@gmail.com",
    password: "",
    bio: "Looking for meaningful connections!",
    school:"Western University",
    caffeine:"coffee",
    dayornight:"night",
    focus:"front-end",
    year:"2",
    favouriteLanguage:"java",
    

  });

  const [profilePic, setProfilePic] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview uploaded image
    }
  };

  // Save changes
  const saveChanges = () => {
    alert("Changes saved!");
    console.log("Updated User Info:", userInfo);
  };

  // Log out
  const handleLogout = () => {
    alert("You have been logged out.");
    // Add logout logic (e.g., clear tokens, redirect to login)
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>

      {/* Profile Picture Section */}
      <div className="profile-pic-section">
        <label htmlFor="profilePic">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
          />
        </label>
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          onChange={handleProfilePicUpload}
          hidden
        />
        <p>Click to change profile picture</p>
      </div>

      {/* User Information Section */}
      <div className="user-info">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userInfo.password}
            placeholder="New Password"
            onChange={handleInputChange}
          />
        </label>

        <label>
          Bio:
          <textarea
            name="bio"
            value={userInfo.bio}
            onChange={handleInputChange}
          />
        </label>
        <label>
          School:
          <input
            type="text"
            name="School Name"
            value={userInfo.school}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {/* Save and Logout Buttons */}
      <div className="button-group">
        <button className="save-button" onClick={saveChanges}>
          Save Changes
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className='menus'>
        <div className='menu'><Link to='/home'>home</Link></div>
        <div className='menu'>match</div>
        <div className='menu'>message</div>
        <div className='menu'><Link to='/AccountSettings'>profile</Link></div>
      </div>

    </div>
  );
};

export default AccountSettings;