import React from "react";

import classes from "./NavigationItem.css";

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <span className={props.active ? classes.active : null}>
      {props.children}
    </span>
  </li>
);

export default navigationItem;
