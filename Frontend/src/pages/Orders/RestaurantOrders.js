import React, { Component } from "react";
import { Card } from "react-bootstrap";
import RestaurantOrderList from "./RestaurantOrderList";

export default class RestaurantOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id: 1,
      allOrders: [],
      selectedRestOrderStatus: this.props.selectedRestOrderStatus,
    };
  }

  render() {
    return (
      <div>
        {this.props.allOrders.map((order) => (
          <Card style={{marginTop:"1vh",width:"40%", paddingLeft:6}}>
            <RestaurantOrderList
              orderId={order.order_id}
              orderDate={order.orderDate}
              mode={order.orderMode}
              custOrderStatus={order.custOrderStatus}
              items={order.orderItems}
              totalPrice={order.totalPrice}
              isDelivered={this.props.isDelivered}
              deliveryAddress={order.deliveryAddress}
              customerId={order.customer_id}
            />
          </Card>
        ))}
      </div>
    );
  }
}
