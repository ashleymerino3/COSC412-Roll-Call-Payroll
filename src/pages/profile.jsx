import React from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css"; 

export default function Profile() {
  return (
    <div className="container"> 
      <Navbar /> {/* Sidebar navigation */}
      
      <div className="profile-container">
      <h1>Profile Page</h1>
      <p>Welcome to the profile page!</p>
        </div>
    </div>
  );
}
