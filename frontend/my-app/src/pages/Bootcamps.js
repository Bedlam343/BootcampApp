import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import BootcampsList from "../components/BootcampsList";

const BootcampsPage = () => {
  // useLoaderData() gets access to the "closest" loader data
  const bootcamps = useLoaderData();

  return <BootcampsList bootcamps={bootcamps} />;
};

export default BootcampsPage;

async function loadBootcamps() {
  const response = await fetch("http://localhost:5000/api/v1/bootcamps");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const responseData = await response.json();
    const bootcamps = responseData.data;
    return bootcamps;
  }
}

export function loader() {
  return loadBootcamps();
}
