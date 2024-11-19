import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const startStopwatch = () => {
    if (!isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Update every second
    }
  };

  const stopStopwatch = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsActive(false);
  };

  // Format time in 00:00:00
  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>Shift: {formatTime(time)}</h1>
      <button onClick={startStopwatch} disabled={isActive}>Clock In</button>
      <button onClick={stopStopwatch} disabled={!isActive}>Clock Out</button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}

export default Stopwatch;
