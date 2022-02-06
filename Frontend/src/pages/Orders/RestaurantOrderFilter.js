import React, { Component } from "react";

export default class RestaurantOrderFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id: 1,
    };
  }

  orderDropdownChangeHandler = (e) => {
    this.props.onChangeFilter(e.target.value);
  };

  render() {
    return (
      <div>
        <div>
          <label>Filter by order </label>
          <select value={this.props.selected} onChange={this.orderDropdownChangeHandler}>
            <option value="New Order">New Order</option>
            <option value="Delivered Order">Delivered Order</option>
            <option value="Cancelled Order">Cancelled Order</option>
          </select>
        </div>
      </div>
    );
  };
}
