import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });

        console.log(res);
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((current, element) => {
        return current + element;
      }, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIgredientHandelr = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = priceAddition + oldPrice;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseableState(updatedIngredients);
  };

  removeIgredientHandelr = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseableState(updatedIngredients);
  };

  puchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  puchasingCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  puchasingContinueHandler = () => {
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push("price=" + this.state.totalPrice);

    const queryStrings = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryStrings,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>ingredients Can't be Loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients != null) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIgredientHandelr}
            ingredientRemoved={this.removeIgredientHandelr}
            disabled={disabledInfo}
            totalPrice={this.state.totalPrice.toFixed(2)}
            purchaseable={this.state.purchaseable}
            clicked={this.puchasingHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          continue={this.puchasingContinueHandler}
          cancel={this.puchasingCancelHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    console.log(this.state.ingredients);

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClicked={this.puchasingCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
