import { Form, NavLink, useActionData } from "react-router-dom";

import classes from "./AuthForm.module.css";
import Button from "../../util/UI/Button";

const AuthForm = () => {
  const actionData = useActionData();

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
        {actionData && actionData.error && (
          <p className={classes.loginError}>{actionData.error + "!"}</p>
        )}
      </Form>
      <NavLink to="/signup">Sign up</NavLink>
      <div style={{ textAlign: "center" }}>
        <p>*Admin Credentials (for full-functionality):</p>
        <p>admin@gmail.com</p>
        <p>Password: 123456</p>
      </div>
    </div>
  );
};

export default AuthForm;
