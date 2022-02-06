import React, { Component } from 'react'

export default class AddCartForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity:1
    }
  }

  submitHandler = (e)  => {
    e.preventDefault();
    this.props.onAddCart(this.state.quantity);
  }

  quantityChangeHandler = (e) => {
    this.setState({
      quantity: e.target.value
    })
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input type="number"  name="quantity" onChange={this.quantityChangeHandler} min="1" step="1" defaultValue="1"/>
        <button style={{width:"40%",backgroundColor:"#EEEEEE"}}className="btn btn-light">+Add</button>
      </form>
    );
  }
}
