import { Form } from "react-router-dom";

import classes from "./AuthForm.module.css";
import Button from "../util/Button";

const AuthForm = () => {
  return (
    <div className={classes.container}>
      <Form method="post" className={classes.form}>
        <h1>Login</h1>
        <div className={classes.inputs}>
          <label htmlFor="email">Email:</label>
          <br></br>
          <input id="email" type="email" name="email" required />
          <br></br> <br></br>
          <label htmlFor="password">Password:</label>
          <br></br>
          <input id="password" type="password" name="password" required />
        </div>
        <br></br>
        <Button type="submit">Sign In</Button>
      </Form>
    </div>
  );
};

export default AuthForm;
