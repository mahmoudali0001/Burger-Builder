import React from "react";

import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input {...props.elementConfig} value="" onChange={props.changed} />
      );

      break;

    case "textarea":
      inputElement = (
        <textarea {...props.elementConfig} value="" onChange={props.changed} />
      );

      break;

    case "select":
      inputElement = (
        <select>
          {props.elementConfig.options.map((option) => {
            return (
              <option
                key={option.displayValue}
                onChange={props.changed}
                value=""
              >
                {option.displayValue}
              </option>
            );
          })}
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
