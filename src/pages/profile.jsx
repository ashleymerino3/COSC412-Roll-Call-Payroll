import React from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css"; 
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://owvjnuefadfwxhosbpxj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dmpudWVmYWRmd3hob3NicHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDA3MjYsImV4cCI6MjA0NzAxNjcyNn0.yrV7Pg4IC621kuGGwnLcAoPWnOUg4eQ2PutKNJLPtjs");

export default function Profile() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      getUsers();
    }, []);

    async function getUsers() {
      const { data } = await supabase.from("users").select();
      setUsers(data);
    }
  return (
    <div className="container"> 
      <Navbar /> {/* Sidebar navigation */}
      
      <div className="profile-container">
      <h1>Profile Page</h1>
      <p>Welcome to the profile page!</p>
      <ul>
        {users.map((user) => (
          <li key={user.first_name}>{user.first_name}</li>
        ))}
      </ul>
        </div>
    </div>
  );
}
