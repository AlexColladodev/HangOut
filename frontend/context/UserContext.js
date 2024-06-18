import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
