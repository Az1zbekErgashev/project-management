import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from 'types/User';

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  roleAccess: number | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const getUserRole = (role: string): number => {
    switch (role.toLowerCase()) {
      case 'administrator':
        return 1;
      case 'editor':
        return 2;
      case 'viewer':
        return 3;
      case 'superadmin':
        return 1;
      case 'systemadmin':
        return 1;
      default:
        return 3;
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser({
      ...updatedUser,
    });
  };



  return (
    <UserContext.Provider value={{ user, setUser: updateUser, roleAccess: user?.Role }}>
      {children}
    </UserContext.Provider>
  );
};
