import React from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css"; 

export default function Schedule() {
  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      
      <div className="schedule-container">
        <h1>Schedule Page</h1>
        <p>Welcome to the schedule page!</p>
      </div>
    </div>
  );
}
