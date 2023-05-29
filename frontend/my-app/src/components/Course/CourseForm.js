import { useRef } from "react";

import classes from "./CourseForm.module.css";
import Button from "../../util/UI/Button";

const validSkill = (skill) => {
  if (
    skill !== "beginner" &&
    skill !== "intermediate" &&
    skill !== "advanced"
  ) {
    return false;
  }
  return true;
};

const CourseForm = (props) => {
  const courseTitleRef = useRef();
  const courseDescriptionRef = useRef();
  const courseLengthRef = useRef();
  const courseTuitionRef = useRef();
  const courseMinSkillRef = useRef();
  const courseScholarShipAvailableRef = useRef();

  const course = props.course ? props.course : {};

  const addCourseHandler = () => {
    if (!validSkill(courseMinSkillRef.current.value)) {
      window.alert("Please provide a valid minimum skill level.");
      courseMinSkillRef.current.focus();
      return;
    }
    const newCourse = {
      _id: `${courseTitleRef.current}_${Date.now()}`,
      title: courseTitleRef.current.value,
      description: courseDescriptionRef.current.value,
      weeks: courseLengthRef.current.value,
      tuition: courseTuitionRef.current.value,
      minimumSkill: courseMinSkillRef.current.value,
      scholarshipsAvailable:
        courseScholarShipAvailableRef.current.value === "on",
    };

    props.onAdd(newCourse);
  };

  const updateCourseHandler = () => {
    const updatedCourse = {
      _id: course._id,
      title: courseTitleRef.current.value,
      description: courseDescriptionRef.current.value,
      weeks: courseLengthRef.current.value,
      tuition: courseTuitionRef.current.value,
      minimumSkill: courseMinSkillRef.current.value,
      scholarshipsAvailable:
        courseScholarShipAvailableRef.current.value === "on",
    };

    props.onUpdate(updatedCourse);
  };

  const discardCourseHandler = () => {
    props.onDiscard();
  };

  return (
    <div method="post" className={classes.form}>
      <div className={classes.field}>
        <label htmlFor="courseTitle">Title:</label>
        <input
          ref={courseTitleRef}
          type="text"
          id="courseTitle"
          name="courseTitle"
          defaultValue={course.title}
          required
        ></input>
      </div>
      <div className={classes.field}>
        <label htmlFor="courseDescription">Description:</label>
        <input
          ref={courseDescriptionRef}
          type="text"
          id="courseDescription"
          name="courseDescription"
          defaultValue={course.description}
          required
        ></input>
      </div>
      <div className={classes.field}>
        <label htmlFor="courseLength">Length (in weeks):</label>
        <input
          ref={courseLengthRef}
          type="number"
          id="courseLength"
          name="courseLength"
          defaultValue={course.weeks}
          required
        ></input>
      </div>
      <div className={classes.field}>
        <label htmlFor="courseTuition">Tuition $:</label>
        <input
          ref={courseTuitionRef}
          type="number"
          id="courseTuition"
          name="courseTuition"
          defaultValue={course.tuition}
          required
        ></input>
      </div>
      <div className={classes.field}>
        <label htmlFor="courseMinSkill">
          Minimum Skill Level (beginner, intermediate, advanced):
        </label>
        <input
          ref={courseMinSkillRef}
          type="text"
          id="courseMinSkill"
          name="courseMinSkill"
          defaultValue={course.minimumSkill}
          required
        ></input>
      </div>
      <div className={classes.checkboxField}>
        <label htmlFor="scholarshipsAvailable">Scholarships Available</label>
        <input
          type="checkbox"
          id="scholarshipsAvailable"
          name="scholarshipsAvailable"
          ref={courseScholarShipAvailableRef}
          defaultChecked={course.scholarshipsAvailable ? "checked" : ""}
        ></input>
      </div>
      <div className={classes.formButtons}>
        <Button onClick={discardCourseHandler} type="button">
          Cancel
        </Button>
        {props.new && <Button onClick={addCourseHandler}>Add</Button>}
        {!props.new && <Button onClick={updateCourseHandler}>Update</Button>}
      </div>
    </div>
  );
};

export default CourseForm;
