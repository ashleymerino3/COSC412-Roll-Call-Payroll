import * as React from "react";
import Navbar from "../components/navbar"; // Import the Navbar component
import Stopwatch from "../components/stopwatch";
import "../styles/styles.css"; 
import { UserContext, UserProvider } from "../context/userContext"; //Import userContext for curretUser variable. 
import { useContext } from "react"; //Import React UserContext feature

export default function Home() {
  const { currentUser } = useContext(UserContext); //Referencing the shared userContext container for currentUser.
  const hello = "Roll Call Payroll System ";

  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}

      <div className="home-container">
        <h1 className="title">{hello}</h1>
        <p className="welcome-message">Welcome Back {currentUser ? currentUser.name : "User"}!</p>
        <p className="dashboard">Dashboard</p>
         {/* Image under the Dashboard text */}
        <div className="image-message-container">
          <img 
            src="https://cdn.glitch.global/1443c777-3096-4bdf-9224-8a51355174f8/admin%20profile%20pic.png?v=1732242227147" 
            alt="Admin Profile" 
            className="admin-profile-img" 
          />
          <p className="manager-message">Due to snow, we will be opening the store two hours late today. Enjoy the extra hours of sleep! - John Doe</p>
        </div>
        <div className = "stopwatch-container">
        <Stopwatch /> {/* Add the Stopwatch component here */}
        </div>
      </div>
    </div>
  );
}