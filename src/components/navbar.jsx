import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

export default function Navbar() {
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link to="/">Home </Link> {/* Link to the Home component (Main Menu) */}
        </li>
        <li>
          <Link to="/profile">Profile</Link> {/* Link to Profile route */}
        </li>
        <li>
          <Link to="/time-tracking">Time Tracking</Link> {/* Link to Time Tracking route */}
        </li>
        <li>
          <Link to="/payroll">Payroll</Link> {/* Link to Payroll route */}
        </li>
        <li>
          <Link to="/schedule">Schedule</Link> {/* Link to Schedule route */}
        </li>
      </ul>
    </nav>
  );
}
