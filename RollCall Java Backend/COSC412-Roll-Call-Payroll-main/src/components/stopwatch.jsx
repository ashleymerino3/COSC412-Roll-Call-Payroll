import React, { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://owvjnuefadfwxhosbpxj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dmpudWVmYWRmd3hob3NicHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDA3MjYsImV4cCI6MjA0NzAxNjcyNn0.yrV7Pg4IC621kuGGwnLcAoPWnOUg4eQ2PutKNJLPtjs"
);
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentShift, setCurrentShift] = useState(null); // Track active shift in the database
  const timerRef = useRef(null);

  const startStopwatch = async () => {
    if (!isActive) {
      try {
        // Start new shift in the database
        const { data, error } = await supabase
          .from("shifts")
          .insert({
            userid: 2, // Replace with logged-in user's ID
            start_time_stamp: new Date().toISOString(),
          })
          .select("*")
          .single();

        if (error) throw error;

        setCurrentShift(data);
        console.log("Shift started:", data);

        // Start stopwatch
        setIsActive(true);
        timerRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000); // Update every second
      } catch (error) {
        console.error("Error starting shift:", error);
      }
    }
  };

  const stopStopwatch = async () => {
    if (isActive && currentShift) {
      try {
        // End the shift in the database
        const { error } = await supabase
          .from("shifts")
          .update({ end_time_stamp: new Date().toISOString() })
          .eq("shift_id", currentShift.shift_id);

        if (error) throw error;

        console.log("Shift ended");
        setCurrentShift(null); // Clear current shift

        // Stop stopwatch
        clearInterval(timerRef.current);
        setIsActive(false);
      } catch (error) {
        console.error("Error ending shift:", error);
      }
    }
  };

  const resetStopwatch = () => {
    // Clear local timer but retain shift info
    clearInterval(timerRef.current);
    setTime(0);
    setIsActive(false);
  };

  // Format time in 00:00:00
  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>Shift Duration: {formatTime(time)}</h1>
      <button onClick={startStopwatch} disabled={isActive}>
        Clock In
      </button>
      <button onClick={stopStopwatch} disabled={!isActive}>
        Clock Out
      </button>
      <button onClick={resetStopwatch}>Reset</button>
      {currentShift && (
        <div>
          <p>Active Shift ID: {currentShift.shift_id}</p>
          <p>Start Time: {new Date(currentShift.start_time_stamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
