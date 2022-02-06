import React, { Component } from "react";

export default class SingleCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity:this.props.quantity,
    };
  }

  quantityChangeHandler = (e) => {
    this.setState({
      quantity: e.target.value
    }, function(){
      this.props.changeQuantity(this.state.quantity,this.props.name)
    })
  };

  addItems = () =>{
    let items = []
    for(var i = 0; i < 100; i++) {
      if (i===0){
        items.push(<option key={i} value={i}>{"Remove"}</option>); 
      }
      else{
        items.push(<option key={i} value={i}>{i}</option>); 
      }
    }
    return items;
  }

  render() {
    const price = `$${this.props.price.toFixed(2)}`;
    this.addItems()

    return (
      <><div>
      <h4>{this.props.name}</h4>
      <span style={{}}>{price}</span>
      <br/>
        <span>Quantity: {this.props.quantity}  <span style={{marginLeft:"20vw",fontWeight:500}}>${(this.props.price*this.props.quantity).toFixed(2)}</span> </span>
      
    </div><div>
    {this.props.isCart && <select id="quantity" value={this.state.quantity} onChange={this.quantityChangeHandler}>
        {this.addItems()}
    </select>} 
      </div></>
    );
  }
}