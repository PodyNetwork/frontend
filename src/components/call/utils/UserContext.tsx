import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User interface
interface User {
  id: string;
  username: string;
  walletAddress: string;
}

interface UserContextType {
  users: User[];  
  setUsers: (users: User[]) => void; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]); 

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
