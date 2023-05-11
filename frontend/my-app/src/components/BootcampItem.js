import { useSubmit } from "react-router-dom";
import Button from "../util/Button";
import AuthContext from "../store/auth-context";

import classes from "./BootcampItem.module.css";
import { useContext } from "react";
import BootcampContext from "../store/bootcamp-context";

const BootcampItem = ({ bootcampId }) => {
  const authContext = useContext(AuthContext);
  const bootcampContext = useContext(BootcampContext);
  const bootcamp = bootcampContext.bootcamps.find(
    (bootcamp) => bootcamp._id === bootcampId
  );
  const submit = useSubmit();

  const isAdmin = authContext.userRole === "admin";

  const additionalFeatures =
    bootcamp.housing ||
    bootcamp.jobAssistance ||
    bootcamp.jobGuarantee ||
    bootcamp.acceptGi;

  const deleteBootcampHandler = (bootcampId) => {
    const del = window.confirm("Are you sure?");
    if (!del) {
      return;
    }
    let formData = new FormData();
    formData.append("bootcampId", bootcampId);
    submit(formData, { method: "post" });
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <div className={classes.buttons}>
          {isAdmin && <Button>Edit</Button>}
          {isAdmin && (
            <Button onClick={() => deleteBootcampHandler(bootcamp._id)}>
              Delete
            </Button>
          )}
        </div>
        <div className={classes.heading}>
          <h1>{bootcamp.name}</h1>
          <p>
            ~ Average Cost: <span>$</span>
            {bootcamp.averageCost}
          </p>
        </div>
        <p>{bootcamp.description}</p>
        <section>
          <h3>Careers:</h3>
          {bootcamp.careers.map((career) => (
            <p key={career}>{career}</p>
          ))}
        </section>

        {additionalFeatures && (
          <section>
            <h3>Additional Features:</h3>
            {bootcamp.housing && (
              <p>
                Housing <span>&#x2713;</span>
              </p>
            )}
            {bootcamp.jobAssistance && (
              <p>
                Job Assistance <span>&#x2713;</span>
              </p>
            )}
            {bootcamp.jobGuarantee && (
              <p>
                Job Guarantee <span>&#x2713;</span>
              </p>
            )}
            {bootcamp.acceptGi && (
              <p>
                Accept GI <span>&#x2713;</span>
              </p>
            )}
          </section>
        )}

        <br></br>
        <br></br>
        <p className={classes.website}>
          For more information visit:&nbsp;&nbsp;
          <span>{bootcamp.website}</span>
        </p>

        <section>
          <h3>Other ways to contact us:</h3>
          <p>{bootcamp.phone}</p>
          <p>{bootcamp.email}</p>
          <p>{bootcamp.location.formattedAddress}</p>
        </section>

        <div className={classes.courses}>
          <Button>Courses</Button>
          {bootcamp.courses.map((course) => (
            <li>{course._id}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootcampItem;
