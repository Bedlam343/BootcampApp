import { Link } from "react-router-dom";

import classes from "./BootcampsList.module.css";

const BootcampsList = ({ bootcamps }) => {
  return (
    <div>
      <h1>All Upcoming Bootcamps</h1>
      <ul>
        {bootcamps.map((bootcamp) => (
          <li key={bootcamp._id}>
            <Link to={`/bootcamps/${bootcamp._id}`}>
              <h2>{bootcamp.name}</h2>
              <p>{bootcamp.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BootcampsList;
