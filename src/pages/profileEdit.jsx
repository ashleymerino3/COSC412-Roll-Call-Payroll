import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { UserContext, UserProvider } from "../context/userContext"; //Import userContext for curretUser variable. 
import { useContext } from "react"; //Import React UserContext feature

const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

export default function ProfileEdit() {
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
  
  
  
  const updateUserData = async (event) => {
    event.preventDefault(); // Prevent blank form submission
    
    const eUsername = event.target.eUsername.value;
    const eFirstName = event.target.eFirstName.value;
    const eLastName = event.target.eLastName.value;
    const eEmail = event.target.eEmail.value;
    const ePhone = event.target.ePhone.value;
    const eJob = event.target.eJob.value;
    const ePay = event.target.ePay.value;
    const eAddress = event.target.eAddress.value;
    
    
    try{
      const { error } = await supabase
        .from("users")
        .update({ username: eUsername})
        .eq("userid", user.userid);
      await supabase
        .from("users")
        .update({ first_name: eFirstName})
        .eq("userid", user.userid);
      await supabase
        .from("users")
        .update({ last_name: eLastName})
        .eq("userid", user.userid);
      await supabase
        .from("users")
        .update({ email: eEmail})
        .eq("userid", user.userid);
      await supabase
        .from("users")
        .update({ phone: ePhone})
        .eq("userid", user.userid);
      await supabase
        .from("users")
        .update({ position: eJob})
        .eq("userid", user.userid);
      await supabase
        .from("users")
        .update({ payrate: ePay})
        .eq("userid", user.userid);
      await supabase
        .from("users")
        .update({ address: eAddress})
        .eq("userid", user.userid);

      if (error){
        return;
      }
      
    } catch (err) {
      console.error("Unexpected error during login:", err);
    }
  };
  
  if(user != null){
    
    return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      <div className="profile-container">
        <h1>Edit Profile Page</h1>
        <p>Edit your profile</p>
        
        <form onSubmit={updateUserData}>
          <label for="eUsername">Username: </label><br></br>
          <input type="text" id="eUsername" defaultValue={user.username} required></input><br></br>
          
          <label for="eFirstName">First name: </label><br></br>
          <input type="text" id="eFirstName" defaultValue={user.first_name} required></input><br></br>
          
          <label for="eLastName">Last name: </label><br></br>
          <input type="text" id="eLastName" defaultValue={user.last_name} required></input><br></br>
          
          <label for="eEmail">Email: </label><br></br>
          <input type="text" id="eEmail" defaultValue={user.email} required></input><br></br>
          
          <label for="ePhone">Phone Number: </label><br></br>
          <input type="text" id="ePhone" defaultValue={user.phone} required></input><br></br>
          
          <label for="eJob">Job Role: </label><br></br>
          <input type="text" id="eJob" defaultValue={user.position} required></input><br></br>
          
          <label for="ePay">Pay Rate: </label><br></br>
          <input type="text" id="ePay" defaultValue={user.payrate} required></input><br></br>
          
          <label for="eAddress">Address: </label><br></br>
          <input type="text" id="eAddress" defaultValue={user.address} required></input><br></br>
          <p></p>
          
          <button type="submit">Save Changes</button>
          
        </form>
        <button id="button" type="button">
          <Link to="/profile">Return to Profile</Link>
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
        <button>
          <Link to="/profile">Return to Profile</Link>
        </button>
       

      </div>
    </div>
  );
  }
  
}