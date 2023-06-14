import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem active link="/">
      Home
    </NavigationItem>
    <NavigationItem>Not Home</NavigationItem>
  </ul>
);

export default navigationItems;
