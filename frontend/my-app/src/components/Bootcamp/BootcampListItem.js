import { NavLink } from "react-router-dom";
import Button from "../../util/UI/Button";
import Card from "../../util/UI/Card";
import classes from "./BootcampListItem.module.css";

const BootcampListItem = ({ bootcamp, owned }) => {
  return (
    <Card key={bootcamp._id}>
      <div className={classes.listItem}>
        <div className={classes.heading}>
          <h3 className={classes.name}>{bootcamp.name}</h3>
          <p>{bootcamp.website}</p>
        </div>
        <p>{bootcamp.description}</p>
        {bootcamp.averageCost && (
          <p className={classes.avgCost}>
            Average Cost: ${bootcamp.averageCost}
          </p>
        )}
        <div className={classes.bottom}>
          <NavLink to={`/bootcamps/${bootcamp._id}`}>
            <Button>Details</Button>
          </NavLink>
          {owned && <p className={classes.owner}>Owned By You.</p>}
        </div>
      </div>
    </Card>
  );
};

export default BootcampListItem;
