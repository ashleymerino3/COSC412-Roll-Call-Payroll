import React, { useEffect, useState } from "react";  
import Navbar from "../components/navbar";
import "../styles/styles.css";
import { createClient } from "@supabase/supabase-js";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


const supabase = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

export default function Payroll() {
  const { currentUser } = useContext(UserContext);
  const [payments, setPayments] = useState([]);
  const [totalHours, setTotalHours] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.userId) { 
      return;
    }
    const fetchPaymentsAndShifts = async () => {
      try {
        // Fetch payment history for currentUser
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
          .eq("userid", currentUser.userId); // Filter by currentUser

        if (error) {
          console.error("Error fetching payment history:", error);
        } else {
          setPayments(data);
        }

        // Fetch shifts for currentUser to calculate total hours
        const { data: shiftsData, error: shiftsError } = await supabase
          .from("shifts")
          .select("start_time_stamp, end_time_stamp")
          .eq("userid", currentUser.userId); // Filter by currentUser

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
  }, [currentUser]);

  // Format the timestamp into a readable date
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

  return (
    <div className="container">
      <Navbar /> {/* Sidebar navigation */}
      
      <div className="pay-container">
        <h1>Payroll Page</h1>
        <p>Welcome to the payroll page!</p>

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
    </div>
  );
}
