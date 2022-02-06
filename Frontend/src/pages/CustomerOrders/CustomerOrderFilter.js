import React, { Component } from "react";

export default class CustomerOrderFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id: 1,
    };
  }

  orderDropdownChangeHandler = (e) => {
    this.props.onChangeFilter(e.target.value);
  };

  renderStatusButton = (mode) => {
    if (mode === "Delivery") {
      return (
        <div>
          <select
            value={this.props.selected}
            onChange={this.orderDropdownChangeHandler}
          >
            <option value="none" selected hidden> Select an Option</option>
            <option value="Order Received">Order Received</option>
            <option value="Preparing">Preparing</option>
            <option value="On the way">On the way</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled Order">Cancelled Order</option>
          </select>
        </div>
      );
    } else if (mode === "Pickup") {
      return (
        <div>
          <select
            value={this.props.selected}
            onChange={this.orderDropdownChangeHandler}
          >
            <option value="none" selected hidden> Select an Option</option>
            <option value="Order Received">Order Received</option>
            <option value="Preparing">Preparing</option>
            <option value="Pickup Ready">Pickup Ready</option>
            <option value="Picked up">Picked up</option>
            <option value="Cancelled Order">Cancelled Order</option>
          </select>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div>
          <label>Filter by order </label>
          {this.renderStatusButton(this.props.mode)}
        </div>
      </div>
    );
  };
}
