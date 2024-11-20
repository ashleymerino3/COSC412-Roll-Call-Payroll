import React, { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setUser] = useState(null); // Shared state for user data

  return (
    <UserContext.Provider value={{ currentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;
