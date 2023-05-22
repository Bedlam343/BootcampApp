import { json, redirect } from "react-router-dom";
import BootcampForm from "../components/BootcampForm";

const NewBootcampPage = () => {
  return <BootcampForm />;
};

export default NewBootcampPage;

// add new bootcamp and its courses to the database
export async function action({ request }) {
  // add bootcamp
  const formData = await request.formData();
  const bootcampData = {
    name: formData.get("name"),
    description: formData.get("description"),
    website: formData.get("website"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    careers: formData.get("careers").split(", "),
    housing: formData.get("housing") === "on",
    jobAssistance: formData.get("jobAssitance") === "on",
    jobGuarantee: formData.get("jobGuarantee") === "on",
    acceptGi: formData.get("acceptGi") === "on",
  };

  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  let response = await fetch("http://localhost:5000/api/v1/bootcamps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(bootcampData),
  });

  if (!response.ok) {
    throw json({ message: "Could not add bootcamp" }, { status: 500 });
  }

  if (response.error) {
    return response;
  }

  return redirect("/bootcamps");
}
