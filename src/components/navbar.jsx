import React from "react";
import "../styles/styles.css";

export default function Navbar() {
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <a href="#">Profile</a>
        </li>
        <li>
          <a href="#">Time Tracking</a>
        </li>
        <li>
          <a href="#">Payroll</a>
        </li>
        <li>
          <a href="#">Schedule</a>
        </li>
      </ul>
    </nav>
  );
}
