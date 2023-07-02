import React, { Component } from "react";

import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data..!</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="Street" placeholder="Street" />
          <input type="text" name="address" placeholder="Postal Code" />
          <Button btnType="Success" clicked={console.log("hi")}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
