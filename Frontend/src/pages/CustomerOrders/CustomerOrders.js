import React, { Component } from "react";
import { Card } from "react-bootstrap";
import CustomerOrderList from "./CustomerOrderList";


export default class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id: 1,
      allOrders: [],
      selectedCustOrderStatus: this.props.selectedCustOrderStatus,
    };
  }

  render() {
    return (
      <div>
        {this.props.allOrders.map((order) => (
          <Card style={{marginTop:"1vh",width:"40%", paddingLeft:6}}>
            <CustomerOrderList
              restName={order.restaurantName}
              orderId={order.order_id}
              orderDate={order.orderDate}
              mode={order.orderMode}
              custOrderStatus={order.custOrderStatus}
              items={order.orderItems}
              totalPrice={order.totalPrice}
              deliveryAddress={order.deliveryAddress}
            />
          </Card>
        ))}
      </div>
    );
  }
}
