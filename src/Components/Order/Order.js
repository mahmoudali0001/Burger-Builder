import React from "react";

import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];

  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName],
    });
  }

  let newIngredientsData = ingredients.map((ig) => {
    return (
      <span
        style={{
          margin: "0 8px",
          textTransform: "capitalize",
          display: "inline-block",
          padding: "8px",
          border: "1px solid #939292",
          borderRadius: "10px",
        }}
        key={ig.name}
      >
        {ig.name}: {ig.amount}
      </span>
    );
  });

  console.log(newIngredientsData);
  return (
    <div className={classes.Order}>
      <p>Ingredients: {newIngredientsData}</p>
      <p>
        Price: <strong>USD {Number(props.totalPrice).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
