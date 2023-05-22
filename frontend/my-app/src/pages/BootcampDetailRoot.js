import { Outlet, defer, json } from "react-router-dom";

const BootcampDetailLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

async function loadBootcamp(bootcampId) {
  const response = await fetch(
    "http://localhost:5000/api/v1/bootcamps/" + bootcampId
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch bootcamp." }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.data;
  }
}

async function loadCourses(bootcampId) {
  const response = await fetch(
    "http://localhost:5000/api/v1/bootcamps/" + bootcampId + "/courses"
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch courses for bootcamp." },
      { status: 500 }
    );
  } else {
    const responseData = await response.json();
    const courses = responseData.data;
    return courses;
  }
}

// get id of bootcamp from url
export async function loader({ params }) {
  const bootcampId = params.bootcampId;
  return defer({
    bootcamp: await loadBootcamp(bootcampId),
    courses: await loadCourses(bootcampId),
  });
}

export default BootcampDetailLayout;
