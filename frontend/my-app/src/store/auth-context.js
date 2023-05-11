import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: "",
  userName: "",
  userEmail: "",
  userRole: "",
  login: () => {},
  updateUserData: (userData) => {},
  logout: () => {},
});

export default AuthContext;
