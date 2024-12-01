
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./post.css";
return (
    <div className="signup">
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
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setProfilePic(URL.createObjectURL(file));
                }}
                hidden
            />
            </div>
            </div>
            export default Post;