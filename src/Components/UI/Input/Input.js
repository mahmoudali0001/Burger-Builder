import React from "react";

import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = <input {...props.elementConfig} value={props.value} />;

      break;

    case "textarea":
      inputElement = <textarea {...props.elementConfig} value={props.value} />;

      break;

    case "select":
      inputElement = (
        <select {...props.elementConfig} value={props.value}>
          {props.opions}
        </select>
      );

      break;

    default:
      inputElement = null;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
