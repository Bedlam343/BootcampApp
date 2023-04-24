import { Suspense } from "react";
import { Await, useLoaderData, json, defer } from "react-router-dom";
import BootcampItem from "../components/BootcampItem";

const BootcampDetailPage = () => {
  const { bootcamp } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textlign: "center" }}>Loading...</p>}>
      <Await resolve={bootcamp}>
        {(loadedBootcamp) => <BootcampItem bootcamp={loadedBootcamp} />}
      </Await>
    </Suspense>
  );
};

// fetch bootcamp with bootcampId
async function loadBootcamp(bootcampId) {
  const response = await fetch(
    "http://localhost:5000/api/v1/bootcamps/" + bootcampId
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch event..." }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.data;
  }
}

export async function loader({ request, params }) {
  const bootcampId = params.bootcampId;

  return defer({
    bootcamp: await loadBootcamp(bootcampId),
  });
}

export default BootcampDetailPage;
