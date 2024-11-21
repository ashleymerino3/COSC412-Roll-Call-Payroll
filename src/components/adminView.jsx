import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);
function AdminView() {
  const [currentView, setCurrentView] = useState("ProfileView");
  const [user, setUser] = useState(null); // Initialize as null
  const [error, setError] = useState(null); // Track errors
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [totalHours, setTotalHours] = useState({});
  

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.from("users").select().eq("userid", 2);
      if (error) {
        console.error("Error fetching user:", error);
        setError(error);
      } else {
        setUser(data[0]); // Access the first user in the array
      }
    };

    getUser();
    
    const fetchShifts = async () => {
      setLoading(true);
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
          .eq("userid", user.userid);

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
    
    const fetchPaymentsAndShifts = async () => {
      setLoading(true);
      try {
        // Fetch payment history for user 2
        const { data, error } = await supabase
          .from("payment_history")
          .select(`
            payment_date,
            payment_amount,
            shifts (*),
            users (
              username,
              payrate
            )
          `)
          .eq("userid", 2); // Filter by user 2

        if (error) {
          console.error("Error fetching payment history:", error);
        } else {
          setPayments(data);
        }

        // Fetch shifts for user 2 to calculate total hours
        const { data: shiftsData, error: shiftsError } = await supabase
          .from("shifts")
          .select("start_time_stamp, end_time_stamp")
          .eq("userid", 2); // Filter by user 2

        if (shiftsError) {
          console.error("Error fetching shifts:", shiftsError);
        } else {
          // Calculate total hours for each shift
          const hours = shiftsData.reduce((acc, shift) => {
            if (shift.start_time_stamp && shift.end_time_stamp) {
              const start = new Date(shift.start_time_stamp);
              const end = new Date(shift.end_time_stamp);
              const diffInMs = end - start; // Difference in milliseconds
              const hoursWorked = diffInMs / (1000 * 60 * 60); // Convert to hours
              const month = start.toLocaleString("default", { month: "long", year: "numeric" });
              acc[month] = (acc[month] || 0) + hoursWorked; // Sum total hours per month
            }
            return acc;
          }, {});
          setTotalHours(hours);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsAndShifts();
  }, []);
  

  const setViewTime = () => {
    // Clear local timer but retain shift info
    setCurrentView("TimeView");
  };

  const setViewProfile = () => {
    // Clear local timer but retain shift info
    setCurrentView("ProfileView");
  };
  
  const setViewPay = () => {
    // Clear local timer but retain shift info
    setCurrentView("PayView");
  };
  
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
  
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleDateString();
  };

  // Get the previous month for the pay period
  const getPreviousMonth = (date) => {
    const prevMonth = new Date(date);
    prevMonth.setMonth(prevMonth.getMonth() - 1); // Move to the previous month
    return prevMonth.toLocaleString("default", { month: "long", year: "numeric" }); // Return month and year
  };
  
  if (error) {
    return (
      <div>
        <h1>Error Loading Data</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>Loading Data...</h1>
        <p>Please wait while we fetch your data.</p>
      </div>
    );
  }

  if(currentView === "ProfileView"){
    return(
      <div>
        <button type="button" onClick={setViewProfile}>View Profile</button>
        <button type="button" onClick={setViewTime}>View Time</button>
        <button type="button" onClick={setViewPay}>View Pay</button>
      
        <p>Welcome to {user.first_name} {user.last_name}'s profile page!</p>
        <p>Username: {user.username}</p>
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phone}</p>
        <p>Job Role: {user.position}</p>
        <p>Pay Rate: ${user.payrate}</p>
        <p>Address: {user.address}</p>
      </div>
    );
  } else if (currentView ==="TimeView") {
    return(
      <div>
        <button type="button" onClick={setViewProfile}>View Profile</button>
        <button type="button" onClick={setViewTime}>View Time</button>
        <button type="button" onClick={setViewPay}>View Pay</button>
        
        <p>Welcome to {user.first_name} {user.last_name}'s time tracking page!</p>
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
    );
  } else if (currentView === "PayView") {
    return(
      <div>
        <button type="button" onClick={setViewProfile}>View Profile</button>
        <button type="button" onClick={setViewTime}>View Time</button>
        <button type="button" onClick={setViewPay}>View Pay</button>
        
        <p>Welcome to {user.first_name} {user.last_name}'s payroll page!</p>
        {loading ? (
          <p>Loading payments...</p>
        ) : (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Pay Period</th>
                <th>Username</th>
                <th>Payrate</th>
                <th>Total Hours</th>
                <th>Expected Payment Date</th>
                <th>Expected Payment Amount</th>
                <th>Actual Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => {
                const formattedDate = formatDate(payment.payment_date);
                
                // Get the expected payment date (2nd of the next month)
                const paymentDate = new Date(payment.payment_date);
                const previousMonth = getPreviousMonth(paymentDate);

                // Get total hours for the month from totalHours object
                const hoursForMonth = totalHours[previousMonth] || 0;

                return (
                  <tr key={payment.payment_id}>
                    <td>{previousMonth}</td> {/* Display the previous month for pay period */}
                    <td>{payment.users.username}</td>
                    <td>${payment.users.payrate}</td>
                    <td>{hoursForMonth.toFixed(2)} hours</td> {/* Total hours for the month */}
                    <td>{formattedDate}</td> {/* Expected payment date */}
                    <td>${ (payment.users.payrate * hoursForMonth).toFixed(2) }</td>
                    <td>${payment.payment_amount?.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  } else {
    return(
      <div>
      </div>
    );
  }
}

export default AdminView;