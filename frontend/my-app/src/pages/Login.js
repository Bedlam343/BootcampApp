import { useContext } from "react";
import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import AuthContext from "../store/auth-context";

let authContext = null;

const LoginPage = () => {
  authContext = useContext(AuthContext);
  return <AuthForm />;
};

export default LoginPage;

export async function action({ request }) {
  // get the entered email and password from the form
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // send request to the backend
  const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const responseData = await response.json();
  // token sent by backend
  const token = responseData.token;

  // store token in browser storage (key, data)
  localStorage.setItem("token", token);
  const expiration = new Date();

  // expires after 1 hour
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  // update state-wide login state
  authContext.login();

  return redirect("/");
}
