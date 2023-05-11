import { Suspense, useContext } from "react";
import { Await, useLoaderData, json, defer, redirect } from "react-router-dom";
import BootcampItem from "../components/BootcampItem";
import BootcampContext from "../store/bootcamp-context";

let bootcampContext;

const BootcampDetailPage = () => {
  const bootcampId = useLoaderData();
  bootcampContext = useContext(BootcampContext);

  return <BootcampItem bootcampId={bootcampId} />;
};

// get id of bootcamp from url
export function loader({ params }) {
  const bootcampId = params.bootcampId;
  return bootcampId;
}

// delete a bootcamp
export async function action({ request }) {
  const formData = await request.formData();
  const bootcampId = formData.get("bootcampId");

  const userToken = localStorage.getItem("token");
  const authorization = "Bearer " + userToken;

  const response = await fetch(
    "http://localhost:5000/api/v1/bootcamps/" + bootcampId,
    {
      method: "delete",
      headers: {
        authorization: authorization,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete bootcmap" }, { status: 500 });
  }

  bootcampContext.removeBootcamp(bootcampId);

  return redirect("/bootcamps");
}

export default BootcampDetailPage;
