import React from "react";

import Burder from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummery.css";

const checkoutSummery = (props) => (
  <div className={classes.CheckoutSummery}>
    <h1>We Hope it testes Well..!</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burder ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked>
      CANCEL
    </Button>
    <Button btnType="Success" clicked>
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummery;
