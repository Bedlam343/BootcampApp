import { NavLink, useNavigate } from "react-router-dom";
// import DropDown from "react-dropdown";
import "react-dropdown/style.css";

// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const isAdmin = authContext.role === "admin";

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    authContext.logout();
    navigate("/");
  };

  const bootcampDropdownSelectionHanlder = (event) => {
    navigate(event.target.value);
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

        {/* <DropDown options={bootcampOptions} onChange={this.} /> */}

        <select value="" onChange={bootcampDropdownSelectionHanlder}>
          <option value="" disabled hidden>
            Bootcamps
          </option>
          <option value="/bootcamps">All Bootcamps</option>
          {isAdmin && (
            <option value="/bootcamps/new">Create New Bootcamp</option>
          )}
        </select>

        {!authContext.isLoggedIn && (
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

        {authContext.isLoggedIn && (
          <button onClick={logoutHandler}>Logout</button>
        )}
      </nav>
    </div>
  );
};

export default MainNavigation;
