import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AdminContext.Provider value={{ adminId, setAdminId, token, setToken }}>
      {children}
    </AdminContext.Provider>
  );
};
