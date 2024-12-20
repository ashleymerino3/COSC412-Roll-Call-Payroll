import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "../styles/styles.css";
import { UserContext, UserProvider } from "../context/userContext"; //Import userContext for curretUser variable. 
import { useContext } from "react"; //Import React UserContext feature

// Initialize Supabase client
const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

export default function Navbar() {
  const [managerAccess, setManagerAccess] = useState(false);
  const { currentUser } = useContext(UserContext); //Referencing the shared userContext container for currentUser.

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = currentUser.userId; // Replace with the logged-in user's ID (this can come from your authentication flow)

        const { data, error } = await supabase
          .from("users")
          .select("manager_access")
          .eq("userid", userId)
          .single(); // Fetch user data

        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setManagerAccess(data.manager_access); // Set manager_access value
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Fetch user data 
  }, []);

  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link to="/">Sign Out</Link>
        </li>
        <li>
          <Link to="/home">Home</Link> {/* Link to the Home component (Main Menu) */}
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

        {/* If Manager then Admin Page shows up on navbar else it is not an option */}
        {managerAccess && (
          <li>
            <Link to="/admin">Admin Page</Link> {/* Link to Admin Page route */}
          </li>
        )}
      </ul>
    </nav>
  );
}
