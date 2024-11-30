import React from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css"; 

export default function Schedule() {
  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      
      <div className="schedule-container">
        <h1>Schedule Page</h1>
        <p>Schedule will be posted soon</p>
      </div>
    </div>
  );
}
