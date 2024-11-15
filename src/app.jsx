import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated imports for v6
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProfileEdit from "./pages/profileEdit";
import TimeTracking from "./pages/timetracking";
import Payroll from "./pages/payroll";
import Schedule from "./pages/schedule";

export default function App() {
  return (
    <Router>
      <Routes> {/* Use Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileEdit" element={<ProfileEdit />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
}
