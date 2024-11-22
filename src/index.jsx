import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import { UserProvider } from "./context/userContext"; //userID universal variable container

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);