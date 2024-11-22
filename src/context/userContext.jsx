import React, { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
//  const [currentUser, setUser] = useState(null); //currentUser will be the shared variable //Should be null by default, use setUser once available.
  const [currentUser, setUser] = useState({ //Dummy data for testing
    userId: "2",
    name: "Alice",
    email: "alice@example.com",
    role: "Admin",
  });

  return (
    <UserContext.Provider value={{ currentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;