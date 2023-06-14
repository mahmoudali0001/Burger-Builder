import React, { Component } from "react";

import Aux from "../Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/NavigationItems/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  SideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  SideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.SideDrawerOpenHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
