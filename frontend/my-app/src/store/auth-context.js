import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  login: (userData) => {},
  updateUserData: (userData) => {},
  logout: () => {},
});

export default AuthContext;
