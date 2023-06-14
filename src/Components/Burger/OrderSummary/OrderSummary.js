import React, { Component } from "react";

import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("[OrderSummary] componentWillUpdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igkey) => (
        <li key={igkey}>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
          {this.props.ingredients[igkey]}
        </li>
      )
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>

        <ul>{ingredientSummary}</ul>

        <p>
          Total Price:{" "}
          <strong style={{ color: "green" }}>${this.props.totalPrice}</strong>
        </p>

        <p>Continue to Checkout? </p>
        <Button clicked={this.props.cancel} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
