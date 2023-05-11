import { Form, useNavigate } from "react-router-dom";

import classes from "./BootcampForm.module.css";
import Button from "../util/Button";

const BootcampForm = (bootcamp) => {
  const navigate = useNavigate();

  let careers;
  if (bootcamp.careers) {
    careers = bootcamp.careers.join(", ");
  }

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <div className={classes.container}>
      <h2>Create New Bootcamp</h2>

      <div className={classes.formContainer}>
        <Form method="POST" className={classes.form}>
          <div className={classes.field}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bootcamp.name}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={bootcamp.description}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="website">Website:</label>
            <input
              type="text"
              id="website"
              name="website"
              value={bootcamp.website}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={bootcamp.phone}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={bootcamp.email}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={bootcamp.address}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="careers">Careers (separate by commas):</label>
            <input
              type="text"
              id="careers"
              name="careers"
              value={careers}
              required
            ></input>
          </div>

          <div className={classes.checkboxField}>
            <label htmlFor="housing">Housing</label>
            <input
              type="checkbox"
              id="housing"
              name="housing"
              defaultChecked={bootcamp.housing ? "checked" : ""}
            ></input>
          </div>
          <div className={classes.checkboxField}>
            <label htmlFor="jobAssistance">Job Assistance</label>
            <input
              type="checkbox"
              id="jobAssistance"
              name="jobAssistance"
              defaultChecked={bootcamp.jobAssistance ? "checked" : ""}
            ></input>
          </div>
          <div className={classes.checkboxField}>
            <label htmlFor="jobGuarantee">Job Guarantee</label>
            <input
              type="checkbox"
              id="jobGuarantee"
              name="jobGuarantee"
              defaultChecked={bootcamp.jobGuarantee ? "checked" : ""}
            ></input>
          </div>
          <div className={classes.checkboxField}>
            <label htmlFor="acceptGi">Accept GI</label>
            <input
              type="checkbox"
              id="acceptGi"
              name="acceptGi"
              defaultChecked={bootcamp.acceptGi ? "checked" : ""}
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="photo">Photo:</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={bootcamp.photo}
              required
            ></input>
          </div>
          <div className={classes.buttons}>
            <Button onClick={cancelHandler}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BootcampForm;
