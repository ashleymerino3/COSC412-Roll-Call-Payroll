import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

export default function TimeTracking() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        // Fetch shifts and notes for user #2
        const { data, error } = await supabase
          .from("shifts")
          .select(`
            shift_id,
            start_time_stamp,
            end_time_stamp,
            shift_notes (
              note_text
            )
          `)
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

  // Calculate total hours worked during a shift
  const calculateTotalHours = (start, end) => {
    if (!start || !end) return "N/A";
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffInMs = endTime - startTime; // Difference in milliseconds
    const diffInHours = diffInMs / (1000 * 60 * 60); // Convert to hours
    return diffInHours.toFixed(2); // Format to 2 decimal places
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
                <th>Total Hours</th>
                <th>Shift Notes</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => {
                const start = formatDateTime(shift.start_time_stamp);
                const end = formatDateTime(shift.end_time_stamp);
                const totalHours = calculateTotalHours(
                  shift.start_time_stamp,
                  shift.end_time_stamp
                );
                const notes = shift.shift_notes?.[0]?.note_text || "";
                return (
                  <tr key={shift.shift_id}>
                    <td>{start.date}</td>
                    <td>{start.time}</td>
                    <td>{end.time}</td>
                    <td>{totalHours}</td>
                    <td>{notes}</td>
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
