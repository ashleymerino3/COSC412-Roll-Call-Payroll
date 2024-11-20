import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { useEffect, useState, useRef, useContext } from "react";
import UserContext from "../context/UserContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

export default function ProfileEdit() {
  const { currentUser } = useContext(UserContext);
  const [user, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data, error } = await supabase
                            .from("users")
                            .select()
                            .eq("userid", 2);
    setUsers(data);
  }
  
  async function updateUserData(){
    const { error } = await supabase
        .from("users")
        .update({ username: document.getElementById("eUsername").value.toString})
        .eq("userid", user.userid);
  }
  
  
  if(user != null){
    return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      <div className="profile-container">
        <h1>Edit Profile Page</h1>
        <p>Edit your profile</p>
        
        
        <label for="eUsername">Username: </label><br></br>
        <input type="text" id="eUsername" defaultValue={user.username}></input><br></br>
          
        <label for="eFirstName">First name: </label><br></br>
        <input type="text" id="eFirstName" defaultValue={user.first_name}></input><br></br>
          
        <label for="eLastName">Last name: </label><br></br>
        <input type="text" id="eLastName" defaultValue={user.last_name}></input><br></br>
          
        <label for="eEmail">Email: </label><br></br>
        <input type="text" id="eEmail" defaultValue={user.email}></input><br></br>
          
        <label for="ePhone">Phone Number: </label><br></br>
        <input type="text" id="ePhone" defaultValue={user.phone}></input><br></br>
          
        <label for="eJob">Job Role: </label><br></br>
        <input type="text" id="eJob" defaultValue={user.position}></input><br></br>
          
        <label for="ePay">Pay Rate: </label><br></br>
        <input type="text" id="ePay" defaultValue={user.payrate}></input><br></br>
          
        <label for="eAddress">Address: </label><br></br>
        <input type="text" id="eAddress" defaultValue={user.address}></input><br></br>
        <p></p>
        
        <button onclick={updateUserData()}>
          <Link to="/profile">Edit Profile</Link>
        </button>

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
