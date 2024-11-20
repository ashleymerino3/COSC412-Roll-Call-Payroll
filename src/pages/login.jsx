import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

//Calls to the login server with the user entered username and password
async function login(username, password) {
  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const userId = await response.text(); // Retrieve userId from backend
      console.log("Login successful. User ID:", userId);
      return userId;
    } else if (response.status === 401) {
      console.error("Invalid credentials");
      return null;
    } else {
      console.error("Login failed with status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

export default function Login() {
  const { setCurrentUser } = useContext(UserContext); // Access context to update user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (loginEvent) => {
    loginEvent.preventDefault();

    const userId = await login(username, password); // Call login function

    if (userId) {
      setCurrentUser({ userId }); // Update UserContext with the userId
    } else {
      console.error("Login failed.");
    }
  };

  return (
    <div>
      {/* Add meta and title using React Helmet if needed */}
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
            value={username} // Bind to state
            onChange={(loginEvent) => setUsername(loginEvent.target.value)}
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
            value={password} // Bind to state
            onChange={(loginEvent) => setPassword(loginEvent.target.value)} // Update state on change
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
