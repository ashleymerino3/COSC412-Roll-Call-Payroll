import React, { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

function Stopwatch() {
  const { currentUser } = useContext(UserContext);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [shiftNote, setShiftNote] = useState(""); // Track the shift note
  const timerRef = useRef(null);

  const startStopwatch = async () => {
    if (!isActive) {
      try {
        // Insert a new shift into the shifts table
        const { data: shiftData, error: shiftError } = await supabase
          .from("shifts")
          .insert({
            userid: currentUser.userId, // Replace with logged-in user's ID
            start_time_stamp: new Date().toISOString(),
          })
          .select("*")
          .single();

        if (shiftError) throw shiftError;

        setCurrentShift(shiftData);
        console.log("Shift started:", shiftData);

        // Insert the note into the shift_notes table
        if (shiftNote.trim() !== "") {
          const { error: noteError } = await supabase
            .from("shift_notes")
            .insert({
              shift_id: shiftData.shift_id, // Link note to the created shift
              note_text: shiftNote.trim(),
            });

          if (noteError) throw noteError;

          console.log("Shift note saved:", shiftNote);
        }

        // Start the stopwatch
        setIsActive(true);
        timerRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } catch (error) {
        console.error("Error starting shift or saving note:", error);
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
        setCurrentShift(null);

        // Stop stopwatch
        clearInterval(timerRef.current);
        setIsActive(false);
      } catch (error) {
        console.error("Error ending shift:", error);
      }
    }
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsActive(false);
    setShiftNote(""); // Clear the shift note
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>Shift Duration: {formatTime(time)}</h1>
      {!isActive && (
        <div>
          <label>
            Shift Note:{" "}
            <input
              type="text"
              value={shiftNote}
              onChange={(e) => setShiftNote(e.target.value)}
              placeholder="Enter shift note"
            />
          </label>
        </div>
      )}
      <button onClick={startStopwatch} disabled={isActive || !shiftNote.trim()}>
        Clock In
      </button>
      <button onClick={stopStopwatch} disabled={!isActive}>
        Clock Out
      </button>
      <button onClick={resetStopwatch}>Reset</button>
      {currentShift && (
        <div>
          <p>Enjoy your Shift!</p>
          <p>Start Time: {new Date(currentShift.start_time_stamp).toLocaleString()}</p>
          <p>Shift Note: {shiftNote}</p>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
