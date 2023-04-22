import { Suspense } from "react";
import { Await, json, defer, useLoaderData } from "react-router-dom";
import BootcampsList from "../components/BootcampsList";

const BootcampsPage = () => {
  // useLoaderData() gets access to the "closest" loader data
  const { bootcamps } = useLoaderData();

  return (
    // show fallback while data is arriving
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      {/*show page before bootcamps are even resolved*/}
      <Await resolve={bootcamps}>
        {/*() => {} called when promise is resolved (i.e bootcamps arrive*/}
        {(loadedBootcamps) => <BootcampsList bootcamps={loadedBootcamps} />}
      </Await>
    </Suspense>
  );
};

export default BootcampsPage;

async function loadBootcamps() {
  const response = await fetch("http://localhost:5000/api/v1/bootcamps");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.data;
  }
}

export function loader() {
  // show page before data is fully fetched (defer data fetching)
  return defer({
    bootcamps: loadBootcamps(),
  });
}
