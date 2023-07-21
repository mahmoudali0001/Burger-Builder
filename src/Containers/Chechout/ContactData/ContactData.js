import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Input from "../../../Components/UI/Input/Input";

class ContactData extends Component {
  state = {
    controls: [],
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Mahmoud Ali",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "example@mahmoud.com",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cairo, EL Maadi",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
        street: "",
        postalCode: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
    purchasing: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] =
        this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    };
    for (let key in this.state.orderForm) {
      if (this.state.orderForm[key].valid) {
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
      }
      this.props.match.path = "/";
    }
  };

  checkValidity = (value, rules) => {
    let isValid = false;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    return isValid;
  };

  InputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    updatedFormElement.touched = true;
    let formIsValid = true;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            touched={element.config.touched}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            changed={(event) => this.InputChangeHandler(event, element.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
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

export default withRouter(ContactData);
