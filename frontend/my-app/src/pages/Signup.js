import { redirect } from "react-router-dom";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return <SignupForm />;
};

// create new user
export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData.get("name"));
  return redirect(".");
}

export default SignupPage;
