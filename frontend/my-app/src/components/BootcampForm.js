import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

import classes from "./BootcampForm.module.css";
import Button from "../util/Button";
import CourseItemList from "./CourseItemList";
import CourseForm from "./CourseForm";

// SAVE NEW BOOTCAMP TO THE DATABASE

const BootcampForm = ({ bootcamp, courses }) => {
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [coursesList, setCoursesList] = useState(courses ? courses : []);
  const navigate = useNavigate();

  const title = bootcamp ? "Edit Bootcamp" : "Create New Bootcamp";

  let careers;
  let address;
  if (bootcamp) {
    careers = bootcamp.careers.join(", ");
    address = bootcamp.location.formattedAddress;
  } else {
    bootcamp = {};
  }

  const saveHandler = () => {
    
  }

  const cancelHandler = () => {
    navigate("..");
  };

  const newCourseHandler = () => {
    setIsAddingCourse(true);
  };

  const addNewCourseHandler = (newCourse) => {
    setCoursesList((prevCoursesList) => [newCourse, ...prevCoursesList]);
    setIsAddingCourse(false);
  };

  const updateCourseHandler = (updatedCourse) => {
    setCoursesList((prevCoursesList) => {
      let newCoursesList = [];
      for (let course of prevCoursesList) {
        if (course._id === updatedCourse._id) {
          newCoursesList.push(updatedCourse);
        }
        else {
          newCoursesList.push(course);
        }
      }
      return newCoursesList;
    });
  }

  const discardNewCourseHandler = () => {
    setIsAddingCourse(false);
  };

  const removeCourseHandler = (courseId) => {
    setCoursesList((prevCoursesList) =>
      prevCoursesList.filter((course) => course._id !== courseId)
    );
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
          <div className={classes.field}>
            <label htmlFor="careers">Careers (separate by commas):</label>
            <input
              type="text"
              id="careers"
              name="careers"
              defaultValue={careers}
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
          <div className={classes.formButtons}>
            <Button type="button" onClick={cancelHandler}>
              Cancel
            </Button>
            <Button type="button" onClick={saveHandler}>Save</Button>
          </div>
          <br></br>
          <div className={classes.courseButton}>
            <Button
              type="button"
              disabled={isAddingCourse}
              onClick={newCourseHandler}
            >
              New Course &nbsp;+
            </Button>
          </div>
          {isAddingCourse && (
            <CourseForm
              new={true}
              onAdd={addNewCourseHandler}
              onDiscard={discardNewCourseHandler}
            />
          )}
        </Form>
      </div>
      <CourseItemList
        courses={coursesList}
        onUpdate={updateCourseHandler}
        onRemove={removeCourseHandler}
        editable={true}
      />
    </div>
  );
};

export default BootcampForm;
