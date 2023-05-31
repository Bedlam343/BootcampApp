import { useContext } from "react";
import AuthContext from "../store/auth-context";

const UserWelcome = () => {
  const authContext = useContext(AuthContext);
  return <h1>Welcome, {authContext.firstName}!</h1>;
};

export default UserWelcome;
