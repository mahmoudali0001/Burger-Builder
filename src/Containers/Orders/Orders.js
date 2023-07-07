import React, { Component } from "react";

import axios from "../../axios-order";
import order from "../../Components/Order/Order";
import Order from "../../Components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    Orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        let fetchData = [];
        for (let key in res.data) {
          fetchData.push({ ...res.data[key], id: key });
        }

        this.setState({ Orders: fetchData });

        this.setState({ loading: false });
      })
      .catch((err) => {});
    this.setState({ loading: true });
  }

  render() {
    let orders = <h3>There Is No Orders Yet..!</h3>;
    if (this.state.Orders.length != 0) {
      orders = this.state.Orders.map((order) => {
        return (
          <Order
            key={order.id}
            totalPrice={order.price}
            ingredients={order.ingredients}
          />
        );
      });
    }

    console.log(orders);
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
