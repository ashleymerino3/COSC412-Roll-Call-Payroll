import * as React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/styles.css"; 
import { UserContext, UserProvider } from "../context/userContext";  
import { useContext, useState } from "react";

export default function Login() {
  const {setUser, supabaseCntx} = useContext(UserContext);
  const navigate = useNavigate(); // Initialize the navigate function
  const [errorMessage, setErrorMessage] = useState(""); // State for login errors

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent blank form submission
    setErrorMessage(""); //Clears previous errors.
    
    const username = event.target.username.value.trim();
    const password = event.target.password.value;
    
    try{
      const { data, error } = await supabaseCntx
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();
      
      if (error || !data){
        setErrorMessage("Invalid username or password. Please try again.");
        return;
      }
      setUser({
        userId: data.userid,
        name: data.first_name,
        accessLevel: data.manager_access,
        employerId: data.employerid,
      });
      
      navigate("/");
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="login-body">
    <div className="login-container">
      {/* Header Section */}
      <div className="login-header">
        <h2 className="company-title">Roll Call</h2>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-inputs">
          {/* Username Field */}
          <label htmlFor="username" className="input-label">Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            className="input-field"
            required
          />

          {/* Password Field */}
          <label htmlFor="password" className="input-label">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            className="input-field"
            required
          />

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* Buttons and Options */}
        <div className="login-actions">
          <button type="submit" className="login-button">Login</button>
          <label className="remember-me">
            <input type="checkbox" defaultChecked name="remember" /> Remember me
          </label>
        </div>

        {/* Forgot Password Link */}
        <div className="login-footer">
          Forgot <a href="#" className="forgot-password-link">password?</a>
        </div>
      </form>
    </div>
 </div>
  );
}