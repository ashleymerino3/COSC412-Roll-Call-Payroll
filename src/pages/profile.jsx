import React from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://owvjnuefadfwxhosbpxj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dmpudWVmYWRmd3hob3NicHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDA3MjYsImV4cCI6MjA0NzAxNjcyNn0.yrV7Pg4IC621kuGGwnLcAoPWnOUg4eQ2PutKNJLPtjs"
);

export default function Profile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data } = await supabase.from("users").select();
    setUsers(data);
  }
  
  var user = users[0];
  
  if(user != null){
    return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      <div className="profile-container">
        <h1>Profile Page</h1>
        <p>Welcome to the profile page!</p>
        
        <p key={user.username}>Username: {user.username}</p>
        <p key={user.first_name, user.last_name}>Name: {user.first_name} {user.last_name}</p>
        <p key={user.email}>Email: {user.email}</p>
        <p key={user.phone}>Phone Number: {user.phone}</p>
        <p key={user.position}>Job Role: {user.position}</p>
        <p key={user.payrate}>Pay Rate: ${user.payrate}</p>
        <p key={user.address}>Address: {user.address}</p>

        <button
          type="button"
          onclick="document.getElementById('demo').innerHTML = test"
        >
          Edit User Information
        </button>
      </div>
    </div>
  );
  } else {
    return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      <div className="profile-container">
        <h1>Profile Page</h1>
        <p>Welcome to the profile page!</p>
        
        <p>Username: </p>
        <p>Name: </p>
        <p>Email: </p>
        <p>Phone Number: </p>
        <p>Job Role: </p>
        <p>Pay Rate: </p>
        <p>Address: </p>

        <button
          type="button"
          onclick="document.getElementById('demo').innerHTML = test"
        >
          Edit User Information
        </button>
      </div>
    </div>
  );
  }
  
}
