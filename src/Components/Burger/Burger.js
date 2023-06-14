import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKeys) => {
      return [...Array(props.ingredients[igKeys])].map((_, i) => {
        return <BurgerIngredient key={igKeys + i} type={igKeys} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el); // it's four array inside one array we can concat it all in one array
    }, []);

  if (transformedIngredients == 0) {
    transformedIngredients = (
      <div className={classes.StartOrderMsg}>
        Please start adding ingredients
      </div>
    );
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
