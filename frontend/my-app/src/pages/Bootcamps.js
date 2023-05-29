import { json, useLoaderData } from "react-router-dom";
import BootcampsList from "../components/Bootcamp/BootcampsList";
import { BACKEND_URL } from "../constants";

const BootcampsPage = () => {
  // useLoaderData() gets access to the "closest" loader data
  const bootcamps = useLoaderData();

  return <BootcampsList bootcamps={bootcamps} />;
};

export default BootcampsPage;

export async function loader() {
  const response = await fetch(`${BACKEND_URL}/api/v1/bootcamps`);

  if (!response.ok) {
    throw json({ message: "Could not fetch bootcamps." }, { status: 500 });
  } else {
    const responseData = await response.json();
    const bootcamps = responseData.data;
    return bootcamps;
  }
}
