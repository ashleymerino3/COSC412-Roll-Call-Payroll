import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://owvjnuefadfwxhosbpxj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dmpudWVmYWRmd3hob3NicHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDA3MjYsImV4cCI6MjA0NzAxNjcyNn0.yrV7Pg4IC621kuGGwnLcAoPWnOUg4eQ2PutKNJLPtjs"
);

export default function ProfileEdit() {
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
        <h1>Edit Profile Page</h1>
        <p>Edit your profile</p>
        
        <form action="/profile">
          <label for="eUsername">Username: </label><br></br>
          <input type="text" id="eUsername" name="eUsername" value={user.username}></input><br></br>
          
          <label for="eFirstName">First name: </label><br></br>
          <input type="text" id="eFirstName" name="eFirstName" value={user.first_name}></input><br></br>
          
          <label for="eLastName">Last name: </label><br></br>
          <input type="text" id="eLastName" name="eLastName" value={user.last_name}></input><br></br>
          
          <label for="eEmail">Email: </label><br></br>
          <input type="text" id="eEmail" name="eEmail" value={user.email}></input><br></br>
          
          <label for="ePhone">Phone Number: </label><br></br>
          <input type="text" id="ePhone" name="ePhone" value={user.phone}></input><br></br>
          
          <label for="eJob">Job Role: </label><br></br>
          <input type="text" id="eJob" name="eJob" value={user.position}></input><br></br>
          
          <label for="ePay">Pay Rate: </label><br></br>
          <input type="text" id="ePay" name="ePay" value={user.payrate}></input><br></br>
          
          <label for="eAddress">Address: </label><br></br>
          <input type="text" id="eAddress" name="eAddress" value={user.address}></input><br></br>
          <p></p>
          <input type="submit" value="Submit"></input>
        </form>

      </div>
    </div>
  );
  } else {
    return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      <div className="profile-container">
        <h1>Edit Profile Page</h1>
        <p>Edit your profile</p>
        
        <form action="/profile">
          <label for="eUsername">Username: </label><br></br>
          <input type="text" id="eUsername" name="eUsername"></input><br></br>
          
          <label for="eFirstName">First name: </label><br></br>
          <input type="text" id="eFirstName" name="eFirstName"></input><br></br>
          
          <label for="eLastName">Last name: </label><br></br>
          <input type="text" id="eLastName" name="eLastName"></input><br></br>
          
          <label for="eEmail">Email: </label><br></br>
          <input type="text" id="eEmail" name="eEmail"></input><br></br>
          
          <label for="ePhone">Phone Number: </label><br></br>
          <input type="text" id="ePhone" name="ePhone"></input><br></br>
          
          <label for="eJob">Job Role: </label><br></br>
          <input type="text" id="eJob" name="eJob"></input><br></br>
          
          <label for="ePay">Pay Rate: </label><br></br>
          <input type="text" id="ePay" name="ePay"></input><br></br>
          
          <label for="eAddress">Address: </label><br></br>
          <input type="text" id="eAddress" name="eAddress"></input><br></br>
          <p></p>
          <input type="submit" value="Submit"></input>
        </form>

      </div>
    </div>
  );
  }
  
}