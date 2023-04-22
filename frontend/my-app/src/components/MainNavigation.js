import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bootcamps"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Bootcamps
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
