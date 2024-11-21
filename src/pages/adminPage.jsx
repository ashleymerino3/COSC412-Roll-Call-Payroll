import * as React from "react";
import Navbar from "../components/navbar"; // Import the Navbar component
import AdminView from "../components/adminView";
import "../styles/styles.css"; 

export default function Home() {

  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}

      <div className="home-container">
        <h1 className="title">Admin Page</h1>
        <p>Welcome to the admin page</p>
        <AdminView />
      </div>
    </div>
  );
}