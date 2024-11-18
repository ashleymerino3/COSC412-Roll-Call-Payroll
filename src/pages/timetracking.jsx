import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://owvjnuefadfwxhosbpxj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dmpudWVmYWRmd3hob3NicHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDA3MjYsImV4cCI6MjA0NzAxNjcyNn0.yrV7Pg4IC621kuGGwnLcAoPWnOUg4eQ2PutKNJLPtjs"
);

export default function TimeTracking() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        // Query the database for shifts for user #2
        const { data, error } = await supabase
          .from("shifts")
          .select("*")
          .eq("userid", 2);

        if (error) {
          console.error("Error fetching shifts:", error);
        } else {
          setShifts(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  // Format the timestamp into a readable date and time
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return { date, time };
  };

  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      <div className="time-container">
        <h1>Time Tracking Page</h1>
        <p>Welcome to the time tracking page!</p>
        {loading ? (
          <p>Loading shifts...</p>
        ) : (
          <table className="shift-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => {
                const start = formatDateTime(shift.start_time_stamp);
                const end = formatDateTime(shift.end_time_stamp);
                return (
                  <tr key={shift.shift_id}>
                    <td>{start.date}</td>
                    <td>{start.time}</td>
                    <td>{end.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
