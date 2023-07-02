import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummery from "../../Components/Order/CheckoutSummery/CheckoutSummery";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      meat: 1,
      bacon: 1,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};

    for (let params of query.entries()) {
      ingredients[params[0]] = +params[1];
    }

    this.setState({ ingredients: ingredients });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log(this.props.history);
    return (
      <div>
        <CheckoutSummery
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />

        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
