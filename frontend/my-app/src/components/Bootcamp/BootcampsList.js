import { Link } from "react-router-dom";

import classes from "./BootcampsList.module.css";
import Button from "../../util/UI/Button";

const BootcampsList = ({ bootcamps }) => {
  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <h1 className={classes.title}>All Bootcamps</h1>
        <ul className={classes.list}>
          {bootcamps.map((bootcamp) => (
            <li className={classes.listItem} key={bootcamp._id}>
              <h3 className={classes.name}>{bootcamp.name}</h3>
              <p>{bootcamp.description}</p>
              {bootcamp.averageCost && (
                <p>Average Cost: ${bootcamp.averageCost}</p>
              )}
              <div className={classes.buttons}>
                <Link to={`/bootcamps/${bootcamp._id}`}>
                  <Button>Details</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BootcampsList;
