import classes from "./CourseItemList.module.css";
import CourseItem from "./CourseItem";

const CourseItemList = (props) => {
  const courses = props.courses ? props.courses : [];

  const updateCourseHandler = (updatedCourse) => {
    props.onUpdate(updatedCourse);
  };

  const removeCourseHandler = (courseId) => {
    props.onRemove(courseId);
  };

  return (
    <div className={classes.coursesContainer}>
      <h3>Bootcamp Courses</h3>
      {courses.map((course) => (
        <CourseItem
          key={course._id}
          onUpdate={updateCourseHandler}
          onRemove={removeCourseHandler}
          course={course}
          editable={props.editable}
        />
      ))}
    </div>
  );
};

export default CourseItemList;
