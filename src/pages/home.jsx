import * as React from "react";
import Navbar from "../components/navbar"; // Import the Navbar component
import Stopwatch from "../components/stopwatch";
import "../styles/styles.css"; 
import UserContext from "../context/userContext"; //Import userContext for curretUser variable. 
import { useContext } from "react"; //Import React UserContext feature

export default function Home() {
  const { currentUser } = useContext(UserContext); //Referencing the shared userContext container for currentUser.
  const hello = "Roll Call Payroll System ";

  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}

      <div className="home-container">
        <h1 className="title">{hello}</h1>
        <p>Welcome Back {currentUser ? currentUser.name : "User"}!</p>
        <div className = "stopwatch-container">
        <Stopwatch /> {/* Add the Stopwatch component here */}
        </div>
      </div>
    </div>
  );
}