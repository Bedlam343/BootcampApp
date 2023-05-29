import classes from "./CourseItem.module.css";
import Button from "../../util/UI/Button";
import { useState } from "react";
import CourseForm from "./CourseForm";

const CourseItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const course = props.course;

  const editCourseHandler = () => {
    setIsEditing(true);
  };

  const updateCourseHandler = (updatedCourse) => {
    props.onUpdate(updatedCourse);
    setIsEditing(false);
  };

  const discardCourseUpdateHandler = () => {
    setIsEditing(false);
  };

  const removeCourseHandler = () => {
    props.onRemove(course._id);
  };

  let courseItem;
  if (isEditing) {
    courseItem = (
      <CourseForm
        new={false}
        course={course}
        onDiscard={discardCourseUpdateHandler}
        onUpdate={updateCourseHandler}
      />
    );
  } else {
    courseItem = (
      <div className={classes.courseItem}>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <p>Tuition: ${course.tuition}</p>
        <p>Length: {course.weeks} weeks</p>
        <p>Minimum Skill: {course.minimumSkill}</p>
        {course.scholarshipsAvailable && (
          <p>
            Scholarships Available&nbsp;&nbsp;<span>&#x2713;</span>
          </p>
        )}
        <div className={classes.buttons}>
          {props.editable && <Button onClick={editCourseHandler}>Edit</Button>}
          {props.editable && (
            <Button onClick={removeCourseHandler}>Delete</Button>
          )}
        </div>
      </div>
    );
  }

  return <>{courseItem}</>;
};

export default CourseItem;
