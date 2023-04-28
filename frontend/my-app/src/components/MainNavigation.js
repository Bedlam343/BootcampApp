import { NavLink, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    authContext.logout();
    navigate("/");
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>SkilledCoders</h3>
      <nav className={classes.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/bootcamps"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Bootcamps
        </NavLink>

        {!isLoggedIn && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Login
          </NavLink>
        )}

        {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      </nav>
    </div>
  );
};

export default MainNavigation;
