import classes from "./BootcampItem.module.css";

const BootcampItem = ({ bootcamp }) => {
  const additionalFeatures =
    bootcamp.housing ||
    bootcamp.jobAssistance ||
    bootcamp.jobGuarantee ||
    bootcamp.acceptGi;

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <h1>{bootcamp.name}</h1>
        <img
          className={classes.image}
          src="../src/defaultImage.png"
          alt={bootcamp.name}
        />
        <p>{bootcamp.description}</p>
        <p>
          <br></br>Careers:{" "}
        </p>
        {bootcamp.careers.map((career) => (
          <p className={classes.inline}>{career}</p>
        ))}
        {additionalFeatures && (
          <p>
            <br></br>Additional Features:{" "}
          </p>
        )}
        {bootcamp.housing && <p className={classes.inline}>Housing &#x2713;</p>}{" "}
        {bootcamp.jobAssistance && (
          <p className={classes.inline}>Job Assistance &#x2713;</p>
        )}
        {bootcamp.jobGuarantee && (
          <p className={classes.inline}>Job Guarantee &#x2713;</p>
        )}
        {bootcamp.acceptGi && (
          <p className={classes.inline}>Accept GI &#x2713;</p>
        )}
        <p>
          <br></br>For more information visit: {bootcamp.website}
        </p>
        <p>
          <br></br>Other Ways to contact us:{" "}
        </p>
      </div>
    </div>
  );
};

export default BootcampItem;
