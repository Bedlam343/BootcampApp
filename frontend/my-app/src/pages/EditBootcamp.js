import { Outlet, useRouteLoaderData } from "react-router-dom";
import BootcampForm from "../components/BootcampForm";

// SEND UPDATE BOOTCAMP REQUEST
// SEND UPDATE COURSE REQUEST

const EditBootcampPage = () => {
  const bootcamp = useRouteLoaderData("bootcampDetail");
  return (
    <>
      <BootcampForm bootcamp={bootcamp.bootcamp} courses={bootcamp.courses} />
    </>
  );
};

// export async function action({ request }) {
//   const formData = await request.formData();
//   const bootcamp = JSON.parse(formData.get("bootcamp"));
//   return bootcamp;
// }

export default EditBootcampPage;
