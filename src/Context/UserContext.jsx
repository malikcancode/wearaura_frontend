import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    token: localStorage.getItem("userToken"),
    role: localStorage.getItem("userRole"),
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
  });

  useEffect(() => {
    if (user.token && user.role && user.name && user.email) {
      localStorage.setItem("userToken", user.token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUser({
      token: null,
      role: null,
      name: null,
      email: null,
    });
  };
  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
