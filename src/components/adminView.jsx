import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { UserContext, UserProvider } from "../context/userContext"; //Import userContext for curretUser variable. 
import { useContext } from "react"; //Import React UserContext feature

const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

function AdminView() {
  const { currentUser } = useContext(UserContext); //Referencing the shared userContext container for currentUser.
  const { currentSelectedUser, setSelectedUser } = useContext(UserContext); //Referencing the shared userContext container for currentUser.
  
  const [currentView, setCurrentView] = useState("ProfileView");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Track errors
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [totalHours, setTotalHours] = useState({});
  const [inputPastMonthVal, setInputPastMonthVal] = useState();

  
  const selectNewUser = async () => {
    const selectedUserInput = document.getElementById("users").value;
    const { data, error } = await supabase.from("users").select().eq("username", selectedUserInput);
    setSelectedUser(data[0]);
    useEffect();
  }
  
  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await supabase.from("users").select().eq("employerid", currentUser.userId);
      if (error) {
        console.error("Error fetching user:", error);
        setError(error);
      } else {
        setUsers(data);
        setSelectedUser(data[0]);
        //alert(selectedUser);
      }
    };
    
    getUsers();
    }, [currentUser, setSelectedUser]);
  useEffect(() => {  
    const fetchShifts = async () => {
      if (!currentSelectedUser) return;
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
          .eq("userid", currentSelectedUser.userid);

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
      if (!currentSelectedUser) return;
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
          .eq("userid", currentSelectedUser.userid); // Filter by user 2

        if (error) {
          console.error("Error fetching payment history:", error);
        } else {
          setPayments(data);
        }

        // Fetch shifts for user 2 to calculate total hours
        const { data: shiftsData, error: shiftsError } = await supabase
          .from("shifts")
          .select("start_time_stamp, end_time_stamp")
          .eq("userid", currentSelectedUser.userid); // Filter by user 2

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
  }, [currentSelectedUser]);
  

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
  
  const inputPastMonth = () => {
    const inputDate = document.getElementById("inputDate").valueAsDate.toISOString();
    setInputPastMonthVal(getPreviousMonth(inputDate));
  }
  
  const createNewPayment = async () => {
    const inputDate = document.getElementById("inputDate").valueAsDate.toISOString();
    const inputPayment = document.getElementById("inputPayment").value;
    if(inputDate !== null && inputPayment !== null){
      try{
        const { error } = await supabase
            .from("payment_history")
            .insert({
              userid: currentSelectedUser.userid,
              payment_date: inputDate,
              payment_amount: inputPayment,
            });

      if (error){
        return;
      }
      
      } catch (err) {
        console.error("Unexpected error during login:", err);
      }
    }
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
  
  const ProfileView = () => {
    return(
      <div className = "Profile-view">
      <div>    
        <p>{currentSelectedUser.first_name} {currentSelectedUser.last_name}'s Profile</p>
        <p><strong>Username:</strong> {currentSelectedUser.username}</p>
        <p><strong>Name:</strong> {currentSelectedUser.first_name} {currentSelectedUser.last_name}</p>
        <p><strong>Email:</strong> {currentSelectedUser.email}</p>
        <p><strong>Phone Number:</strong> {currentSelectedUser.phone}</p>
        <p><strong>Job Role:</strong> {currentSelectedUser.position}</p>
        <p><strong>Pay Rate:</strong> ${currentSelectedUser.payrate}</p>
        <p><strong>Address:</strong> {currentSelectedUser.address}</p>
      </div>
      </div>
    );
  };
  
  const TimeView = () => {
    return(
      <div>    
        <p>Welcome to {currentSelectedUser.first_name} {currentSelectedUser.last_name}'s time tracking page!</p>
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
  };
  
  const PayView = () => {
    return(
      <div>    
        <p>Welcome to {currentSelectedUser.first_name} {currentSelectedUser.last_name}'s payroll page!</p>
        <p>Create new Payment Date: </p>
        <table className="payment-table">
            <thead>
              <tr>
                <th>Pay Period</th>
                <th>Expected Payment Date</th>
                <th>Actual Payment Amount</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{inputPastMonthVal}</td>
                  <td><input type="date" id="inputDate" onChange={inputPastMonth} required></input></td>
                  <td><input type="number" id="inputPayment" required></input></td>
                </tr>
            </tbody>
          </table>
        <button type="button" onClick={createNewPayment}>Save new Payment Date</button>
        
        <p>Preexisting Payment Dates</p>
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
  };
  
  const MultiView = () => {
    if(currentView === "ProfileView"){
    return(
      <div>
        {ProfileView()}
      </div>
    );
  } else if (currentView ==="TimeView") {
    return(
      <div>
        {TimeView()}
      </div>
    );
  } else if (currentView === "PayView") {
    return(
      <div>
        {PayView()}
      </div>
    );
  } else {
    return(
      <div>
      </div>
    );
  }
  };
  
  if (error) {
    return (
      <div>
        <h1>Error Loading Data</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!currentSelectedUser) {
    return (
      <div>
        <h1>Loading Data...</h1>
        <p>Please wait while we fetch your data.</p>
      </div>
    );
  }

    return(
      <div>
        <label for="users">Choose a user:</label>

        <select name="users" id="users" onChange = {selectNewUser}>
          {users.map((user) => (
            <option value={user.id}>{user.username}</option>
          ))}
        </select>
        <div></div>
        
        <button type="button" onClick={setViewProfile}>View Profile</button>
        <button type="button" onClick={setViewTime}>View Time</button>
        <button type="button" onClick={setViewPay}>View Pay</button>
      
        {MultiView()}
      </div> 
    );
}

export default AdminView;