import { Suspense, useContext } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import BootcampsList from "../components/BootcampsList";
import BootcampContext from "../store/bootcamp-context";

let bootcampContext;

const BootcampsPage = () => {
  // useLoaderData() gets access to the "closest" loader data
  const { bootcamps } = useLoaderData();
  bootcampContext = useContext(BootcampContext);

  return (
    // show fallback while data is arriving
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      {/*show page before bootcamps are even resolved*/}
      <Await resolve={bootcamps}>
        {/*() => {} called when promise is resolved (i.e bootcamps arrive*/}
        {() => <BootcampsList />}
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
    const bootcamps = responseData.data;
    // add all bootcamps to bootcamp-context
    for (let bootcamp of bootcamps) {
      bootcampContext.addBootcamp(bootcamp);
    }
    return responseData.data;
  }
}

export function loader() {
  // show page before data is fully fetched (defer data fetching)
  return defer({
    bootcamps: loadBootcamps(),
  });
}
