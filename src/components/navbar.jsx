import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "../styles/styles.css";

// Initialize Supabase client
const supabase = createClient(
  "https://owvjnuefadfwxhosbpxj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dmpudWVmYWRmd3hob3NicHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDA3MjYsImV4cCI6MjA0NzAxNjcyNn0.yrV7Pg4IC621kuGGwnLcAoPWnOUg4eQ2PutKNJLPtjs"
);

export default function Navbar() {
  const [managerAccess, setManagerAccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 1; // Replace with the logged-in user's ID (this can come from your authentication flow)

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
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">Home</Link> {/* Link to the Home component (Main Menu) */}
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