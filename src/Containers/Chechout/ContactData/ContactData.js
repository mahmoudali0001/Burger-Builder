import React, { Component } from "react";

import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Input from "../../../Components/UI/Input/Input";

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
        <Input type="text" name="name" label="Frist Name" inputtype="input" />
        <Input type="email" name="name" label="Email" inputtype="input" />
        <Input
          type="email"
          name="Street"
          label="Your Street"
          inputtype="input"
        />
        <Input type="text" name="address" label="Post Code" inputtype="input" />

        <Input
          type="text"
          name="address"
          label="Post Code"
          inputtype="textarea"
        />
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
