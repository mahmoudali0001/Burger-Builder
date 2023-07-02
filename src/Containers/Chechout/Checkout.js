import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummery from "../../Components/Order/CheckoutSummery/CheckoutSummery";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};

    let price = 0;

    for (let params of query.entries()) {
      if (params[0] == "price") {
        price = params[1];
      } else {
        ingredients[params[0]] = +params[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log(this.state.ingredients);
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
          render={() => {
            return (
              <ContactData
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
