import classes from "./BootcampsList.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import BootcampListItem from "./BootcampListItem";

const BootcampsList = ({ bootcamps }) => {
  const authContext = useContext(AuthContext);
  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <h1 className={classes.title}>All Bootcamps</h1>
        {bootcamps.map((bootcamp) => (
          <BootcampListItem
            bootcamp={bootcamp}
            owned={bootcamp.user === authContext._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BootcampsList;
