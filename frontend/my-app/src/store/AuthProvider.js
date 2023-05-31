import { useReducer } from "react";

import AuthContext from "./auth-context";

const defaultAuthState = {
  isLoggedIn: false,
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    const fullName = action.userData.name.split(" ");
    const newState = {
      isLoggedIn: true,
      _id: action.userData._id,
      firstName: fullName[0],
      lastName: fullName[1] || " ",
      email: action.userData.email,
      role: action.userData.role,
    };
    return newState;
  }
  if (action.type === "LOGOUT") {
    return defaultAuthState;
  }

  return defaultAuthState;
};

const AuthProvider = (props) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );

  const loginUser = (userData) => {
    dispatchAuthAction({ type: "LOGIN", userData: userData });
  };

  const logoutUser = () => {
    dispatchAuthAction({ type: "LOGOUT" });
  };

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    _id: authState._id,
    firstName: authState.firstName,
    lastName: authState.lastName,
    email: authState.email,
    role: authState.role,
    login: loginUser,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
