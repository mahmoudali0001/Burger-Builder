import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const contols = [
  { Label: "Salad", type: "salad" },
  { Label: "Cheese", type: "cheese" },
  { Label: "Bacon", type: "bacon" },
  { Label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.totalPrice}</strong>
      </p>
      {contols.map((ctrl) => (
        <BuildControl
          key={ctrl.Label}
          Label={ctrl.Label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.clicked}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
