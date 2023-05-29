import { Form, useActionData, useSubmit } from "react-router-dom";

import Card from "../util/UI/Card";
import classes from "./SignupForm.module.css";
import TextInput from "../util/UI/TextInput";
import Button from "../util/UI/Button";
import { useRef, useState } from "react";
import Background from "../util/UI/Background";

const isEmpty = (str) => {
  return str.trim().length === 0;
};

const SignupForm = () => {
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState({
    user: false,
    publisher: false,
  });
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const submit = useSubmit();

  const actionData = useActionData();
  if (actionData && !error) {
    setError(`${actionData.error}!`);
  }

  const removeErrorMessageHandler = () => {
    if (!error) {
      return;
    }
    setError(null);
  };

  // do some validation before submitting form
  const submitHandler = () => {
    if (isEmpty(nameRef.current.value)) {
      setError("*All fields must be filled in!");
      nameRef.current.focus();
      return;
    }
    if (isEmpty(emailRef.current.value)) {
      setError("All fields must be filled in!");
      emailRef.current.focus();
      return;
    }
    if (passwordRef.current.value.trim().length < 6) {
      setError("*Password must be at least 6 characters long!");
      return;
    }
    if (passwordRef.current.value !== rePasswordRef.current.value) {
      setError("*Passwords do not match!");
      return;
    }
    if (!checked.user && !checked.publisher) {
      setError("*Must select an account type!");
      return;
    }

    const role = checked.user ? "user" : "publisher";
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("role", role);
    submit(formData, { method: "post" });
  };

  // only allow one checkbox to be selected
  const singleSelectHandler = (type) => {
    if (type === "user" && checked.user) {
      return;
    }
    if (type === "publisher" && checked.publisher) {
      return;
    }
    removeErrorMessageHandler();
    if (type === "user") {
      setChecked({ user: true, publisher: false });
    } else {
      setChecked({ user: false, publisher: true });
    }
  };

  return (
    <Background>
      <h1>Create New Account</h1>
      <div className={classes.container}>
        <Card>
          <Form method="post" className={classes.form}>
            <TextInput
              _ref={nameRef}
              onFocus={removeErrorMessageHandler}
              required={true}
            >
              Name:
            </TextInput>
            <TextInput
              _ref={emailRef}
              onFocus={removeErrorMessageHandler}
              required={true}
            >
              Email:
            </TextInput>
            <TextInput
              type="password"
              _ref={passwordRef}
              onFocus={removeErrorMessageHandler}
              required={true}
            >
              Password:
            </TextInput>
            <TextInput
              type="password"
              _ref={rePasswordRef}
              onFocus={removeErrorMessageHandler}
              required={true}
            >
              Re-enter Password:
            </TextInput>

            <p>Account Type:</p>
            <div className={classes.checkboxes}>
              <div>
                <label htmlFor="user">User</label>
                <input
                  className={classes.round}
                  type="checkbox"
                  id="user"
                  checked={checked.user ? "checked" : ""}
                  onChange={() => singleSelectHandler("user")}
                ></input>
              </div>
              <div>
                <label htmlFor="publisher">Publisher</label>
                <input
                  className={classes.round}
                  type="checkbox"
                  id="publisher"
                  checked={checked.publisher ? "checked" : ""}
                  onChange={() => singleSelectHandler("publisher")}
                ></input>
              </div>
            </div>

            {error && <p className={classes.error}>{error}</p>}
            <Button type="button" onClick={submitHandler}>
              Sign up
            </Button>
          </Form>
        </Card>
      </div>
    </Background>
  );
};

export default SignupForm;
