import React, { Component, useEffect, useRef } from "react";

import classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show &&
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log("[Modal.js] ComponentWillUpdate");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClicked} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
            transition: "0.5s linear",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
