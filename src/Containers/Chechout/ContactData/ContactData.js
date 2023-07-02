import React, { Component } from "react";

import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-order";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
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
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="Street" placeholder="Street" />
        <input type="text" name="address" placeholder="Postal Code" />
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
