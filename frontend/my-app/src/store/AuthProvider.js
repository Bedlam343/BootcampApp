import { useReducer } from "react";

import AuthContext from "./auth-context";

const defaultAuthState = {
  isLoggedIn: false,
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    const newState = {
      isLoggedIn: true,
    };
    return newState;
  }
  if (action.type === "LOGOUT") {
    const newState = {
      isLoggedIn: false,
    };
    return newState;
  }

  return defaultAuthState;
};

const AuthProvider = (props) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );

  const loginUser = () => {
    dispatchAuthAction({ type: "LOGIN" });
  };

  const logoutUser = () => {
    dispatchAuthAction({ type: "LOGOUT" });
  };

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
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
