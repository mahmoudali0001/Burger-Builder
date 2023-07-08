import React, { Component } from "react";

import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Input from "../../../Components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Mahmoud Ali",
        },
        value: "Mahmoud",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "example@mahmoud.com",
        },
        value: "email",
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cairo, EL Maadi",
        },
        value: "address",
        street: "",
        postalCode: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "fastest", displayValue: "Fastest" }],
          options: [{ value: "cheapest", displayValue: "Cheapest" }],
        },
        value: "october",
      },
    },

    loading: false,
    purchasing: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    console.log(this.props);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Mahmoud ALi",
        phoneNumber: "01114426697",
        addreess: {
          country: "Egypt",
          city: "october",
          zipCode: 112235,
        },
        email: "mahmoudAliFarag1@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
    this.setState({ purchasing: false });
    this.setState({ loading: true });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formElementsArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data..!</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
