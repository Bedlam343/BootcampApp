import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./BootcampsList.module.css";
import Button from "../util/Button";
import BootcampContext from "../store/bootcamp-context";

const BootcampsList = () => {
  const bootcampContext = useContext(BootcampContext);
  const bootcamps = bootcampContext.bootcamps;

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <h1 className={classes.title}>All Bootcamps</h1>
        <ul className={classes.list}>
          {bootcamps.map((bootcamp) => (
            <li className={classes.listItem} key={bootcamp._id}>
              <h3 className={classes.name}>{bootcamp.name}</h3>
              <p>{bootcamp.description}</p>
              <p>Average Cost: ${bootcamp.averageCost}</p>
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
