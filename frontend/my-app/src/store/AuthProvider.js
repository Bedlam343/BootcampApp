import { useReducer } from "react";

import AuthContext from "./auth-context";

const defaultAuthState = {
  isLoggedIn: false,
  userId: "",
  userName: "",
  userEmail: "",
  userRole: "",
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    const newState = {
      isLoggedIn: true,
      userId: action.userData._id,
      userName: action.userData.name,
      userEmail: action.userData.email,
      userRole: action.userData.role,
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
    userId: authState.userId,
    userName: authState.userName,
    userEmail: authState.userEmail,
    userRole: authState.userRole,
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
