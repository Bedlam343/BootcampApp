import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  _id: "",
  name: "",
  email: "",
  role: "",
  login: (userData) => {},
  updateUserData: (userData) => {},
  logout: () => {},
});

export default AuthContext;
