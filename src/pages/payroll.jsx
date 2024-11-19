import React from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css"; 

export default function Payroll() {
  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      
      <div className="pay-container">
        <h1>Payroll Page</h1>
        <p>Welcome to the payroll page!</p>
      </div>
    </div>
  );
}
