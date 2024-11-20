import * as React from "react";
import Navbar from "../components/navbar"; // Import the Navbar component
import Stopwatch from "../components/stopwatch";
import "../styles/styles.css"; 

export default function Login() {
  const hello = "Roll Call Payroll System";

  return (
    <div>
      {/* Add meta and title using React Helmet if needed */}
      
      <div className="company-name">
        <h2>Roll Call</h2>
      </div>
      <form action="#" method="POST" className="loginpage">
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