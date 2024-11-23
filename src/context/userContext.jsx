import React, { createContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const UserContext = createContext();

const supabaseCntx = createClient(
  "https://qrurdemqnmtbzyckapnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydXJkZW1xbm10Ynp5Y2thcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjUwMDQsImV4cCI6MjA0NzY0MTAwNH0.jOA0Z8WopLVrbAI4QfO89r2qg8KB9yIxi13hNvcf9cs"
);

export const UserProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const [currentSelectedUser, setSelectedUser] = useState({userid:2});
  //Dummy data for testing
  // const [currentUser, setUser] = useState({ 
  //   userId: "2",
  //   name: "Alice",
  //   email: "alice@example.com",
  //   role: "Admin",
  // });


  return (
    <UserContext.Provider value={{ currentUser, setUser, currentSelectedUser, setSelectedUser, supabaseCntx }}>
      {children}
    </UserContext.Provider>
  );
};
