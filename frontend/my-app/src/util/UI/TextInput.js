import classes from "./TextInput.module.css";

const TextInput = (props) => {
  const type = props.type ? props.type : "text";
  return (
    <div className={classes.inputField}>
      <label htmlFor={props.id}>{props.children}</label>
      <input
        type={type}
        id={props.id}
        name={props.name}
        ref={props._ref}
        required={props.required}
      ></input>
    </div>
  );
};

export default TextInput;
