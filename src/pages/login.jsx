import * as React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/styles.css"; 

export default function Login() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent blank form submission
    // bryce you can add your login validation logic here
    navigate("/");
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
