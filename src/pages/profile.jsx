import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { createClient } from "@supabase/supabase-js";
import { UserContext, UserProvider } from "../context/userContext"; //Import userContext for curretUser variable. 
import { useContext } from "react"; //Import React UserContext feature

const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

export default function Profile() {
  const [user, setUser] = useState(null); // Initialize as null
  const [error, setError] = useState(null); // Track errors
  
  const { currentUser } = useContext(UserContext); //Referencing the shared userContext container for currentUser.

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.from("users").select().eq("userid", currentUser.userId);
      if (error) {
        console.error("Error fetching user:", error);
        setError(error);
      } else {
        setUser(data[0]); // Access the first user in the array
      }
    };

    getUser();
  }, []);

  if (error) {
    return (
      <div className="container">
        <Navbar />
        <div className="profile-container">
          <h1>Error Loading Profile</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <Navbar />
        <div className="profile-container">
          <h1>Loading Profile...</h1>
          <p>Please wait while we fetch your data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar />
      <div className="profile-container">
        <h1>Profile Page</h1>
        <p>Welcome to the profile page!</p>
        <p>Username: {user.username}</p>
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phone}</p>
        <p>Job Role: {user.position}</p>
        <p>Pay Rate: ${user.payrate}</p>
        <p>Address: {user.address}</p>
        <button type="button">
          <Link to="/profileEdit">Edit Profile</Link>
        </button>
      </div>
    </div>
  );
}
