import React from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css"; 

export default function TimeTracking() {
  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      
      <div className="time-container">
        <h1>Time Tracking Page</h1>
        <p>Welcome to the time tracking page!</p>
      </div>
    </div>
  );
}
