import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

let authContext;

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
  let response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  // Invalid credentials
  if (response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  let responseData = await response.json();
  // token sent by backend
  const token = responseData.token;

  // store token in browser storage (key, data)
  localStorage.setItem("token", token);

  const expiration = new Date();
  // expires after 1 hour
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  const authorization = "Bearer " + token;
  // get user information
  response = await fetch("http://localhost:5000/api/v1/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: authorization,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch user information" },
      { status: 500 }
    );
  }

  responseData = await response.json();
  const userData = { ...responseData.data };

  authContext.login(userData);

  return redirect("/");
}
