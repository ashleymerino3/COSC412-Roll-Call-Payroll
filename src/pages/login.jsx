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
    <div>
      <div className="company-name">
        <h2>Roll Call</h2>
      </div>
      <form onSubmit={handleLogin} className="loginpage">
        <div>
          <label htmlFor="username">Username:</label><br />
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            required
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label><br />
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display errors */}


          <button type="submit">Login</button>
          <br />
          <br />

          <label>
            <input type="checkbox" defaultChecked name="remember" /> Remember me
          </label>
        </div>
        <div className="forgotpword">
          Forgot <a href="#">password?</a>
        </div>
      </form>
    </div>
  );
}