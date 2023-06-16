import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavLink id="1" to="/">
      <NavigationItem active>Home</NavigationItem>
    </NavLink>
    <NavLink id="2" to="/checkout">
      <NavigationItem>Not Home</NavigationItem>
    </NavLink>
  </ul>
);

export default navigationItems;
