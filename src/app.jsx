import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated imports for v6
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProfileEdit from "./pages/profileEdit";
import TimeTracking from "./pages/timetracking";
import Payroll from "./pages/payroll";
import Schedule from "./pages/schedule"; 
import Login from "./pages/login";
import AdminPage from "./pages/adminPage";
import { UserProvider } from "./context/userContext"; //userID universal variable container

export default function App() {
  return (
//  <UserProvider></UserProvider> wraps router structure to allow the use of a shared variable container.
    <UserProvider>
      <Router>
        <Routes> {/* Use Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element = {<Login />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileEdit" element={<ProfileEdit />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}