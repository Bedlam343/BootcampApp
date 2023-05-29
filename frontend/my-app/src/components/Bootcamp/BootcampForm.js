import { useState } from "react";
import { Form, useNavigate, useSubmit } from "react-router-dom";

import classes from "./BootcampForm.module.css";
import Button from "../../util/UI/Button";
import CourseItemList from "../Course/CourseItemList";
import CourseForm from "../Course/CourseForm";

const BootcampForm = ({ bootcamp, courses }) => {
  courses = courses ? courses : [];
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const navigate = useNavigate();
  const submit = useSubmit();

  const title = bootcamp ? "Edit Bootcamp" : "Create New Bootcamp";

  let careers;
  let address;
  if (bootcamp) {
    careers = bootcamp.careers.join(", ");
    address = bootcamp.location.formattedAddress;
  } else {
    bootcamp = {};
  }

  const cancelHandler = () => {
    navigate("..");
  };

  const addNewCourseHandler = (newCourse) => {
    const formData = new FormData();
    formData.append("method", "POST_COURSE");
    formData.append("course", JSON.stringify(newCourse));
    submit(formData, { method: "post" });
    setIsAddingCourse(false);
  };

  const updateCourseHandler = (updatedCourse) => {
    const formData = new FormData();
    formData.append("method", "UPDATE_COURSE");
    formData.append("course", JSON.stringify(updatedCourse));
    submit(formData, { method: "post" });
  };

  const discardNewCourseHandler = () => {
    setIsAddingCourse(false);
  };

  const removeCourseHandler = (courseId) => {
    const formData = new FormData();
    formData.append("method", "DELETE_COURSE");
    formData.append("courseId", courseId);
    submit(formData, { method: "post" });
  };

  const toggleAddCourseHandler = () => {
    if (isAddingCourse) {
      return;
    }
    setIsAddingCourse(true);
  };

  return (
    <div className={classes.container}>
      <h2>{title}</h2>

      <div className={classes.formContainer}>
        <Form method="POST" className={classes.form}>
          <div className={classes.field}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={bootcamp.name}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={bootcamp.description}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="website">Website:</label>
            <input
              type="text"
              id="website"
              name="website"
              defaultValue={bootcamp.website}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              defaultValue={bootcamp.phone}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={bootcamp.email}
              required
            ></input>
          </div>
          <div className={classes.field}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={address}
              required
            ></input>
          </div>
          {/* <div className={classes.field}>
            <label htmlFor="careers">Careers (separate by commas):</label>
            <input
              type="text"
              id="careers"
              name="careers"
              defaultValue={careers}
              required
            ></input>
          </div> */}

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
          <div className={classes.formButtons}>
            <Button type="button" onClick={cancelHandler}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
          <br></br>
        </Form>
      </div>
      {courses.length > 0 && (
        <Button onClick={toggleAddCourseHandler}>Add Course &nbsp; +</Button>
      )}
      {isAddingCourse && (
        <CourseForm
          onDiscard={discardNewCourseHandler}
          onAdd={addNewCourseHandler}
          new={true}
        />
      )}
      {courses.length > 0 && (
        <CourseItemList
          onUpdate={updateCourseHandler}
          onRemove={removeCourseHandler}
          courses={courses}
          editable={true}
        />
      )}
    </div>
  );
};

export default BootcampForm;
