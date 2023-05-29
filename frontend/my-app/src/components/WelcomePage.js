import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className={classes.container}>
      <h1>Welcome!</h1>
      <h3>Browse through our bootcamps.</h3>
    </div>
  );
};

export default WelcomePage;
