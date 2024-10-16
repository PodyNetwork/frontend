import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User interface
interface User {
  id: string;
  username: string;
  walletAddress: string;
}

// Update the UserContextType to use User objects
interface UserContextType {
  users: User[];  // Change from usernames to users
  setUsers: (users: User[]) => void; // Change from setUsernames to setUsers
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]); // Initialize with User type

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserContext; // Exporting the context itself
