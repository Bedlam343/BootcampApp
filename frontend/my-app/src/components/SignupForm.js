import { Form } from "react-router-dom";

import Card from "../util/UI/Card";
import classes from "./SignupForm.module.css";
import TextInput from "../util/UI/TextInput";
import Button from "../util/UI/Button";
import { useRef, useState } from "react";
import Background from "../util/UI/Background";

const SignupForm = () => {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const submitHandler = () => {
    if (passwordRef.current.value !== rePasswordRef.current.value) {
      setPasswordsMatch(false);
      return;
    }
  };

  return (
    <Background>
      <h1>Create New User</h1>
      <div className={classes.container}>
        <Card>
          <Form method="post" className={classes.form}>
            <TextInput _ref={nameRef} required={true}>
              Name:
            </TextInput>
            <TextInput _ref={emailRef} required={true}>
              Email:
            </TextInput>
            <TextInput type="password" _ref={passwordRef} required={true}>
              Password
            </TextInput>
            <TextInput type="password" _ref={rePasswordRef} required={true}>
              Re-enter Password
            </TextInput>
            {!passwordsMatch && <p>*Passwords do not match!</p>}
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
