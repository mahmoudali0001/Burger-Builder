import React from "react";

import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );

      break;

    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );

      break;

    case "select":
      inputElement = (
        <select onChange={props.changed} className={inputClasses.join(" ")}>
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.displayValue} value={props.value}>
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
