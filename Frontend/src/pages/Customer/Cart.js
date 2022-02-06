import React, { Component } from "react";
import Modal from "react-modal";
import "./Modal.css";
import SingleCartItem from "./SingleCartItem";
import styles from "../Restaurant/RestaurantHeader.module.css";
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement("#root");

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cartItems: [],
      dummy: ""
    };
  }

  componentDidMount() {
    // console.log("inside cart");
  }

  handleChangeCart = (quantity, name) => {
    const orders = JSON.parse(localStorage.getItem("order"))
    const restID = orders.restID
    const custID = orders.custID
    const restName = orders.restName
    const cart = orders.cart
    if (quantity==="0"){
      var filtered = cart.filter(function(el) { return el.name !== name; }); 
      if (filtered.length>0){
        const orders = {
          restID: restID,
          custID: custID,
          restName: restName,
          cart: filtered
        }
        localStorage.setItem("order", JSON.stringify(orders));
        this.setState({dummy: "  "})
      }
      else{
        const orders = {
          restID: '',
          custID: '',
          restName: '',
          cart: []
        }
        localStorage.setItem("order", JSON.stringify(orders));
        this.setState({dummy: "  "})
      }
    }
    else{
      var result = cart.map(el => el.name === name ? {...el, quantity: Number(quantity)} : el);
      console.log(JSON.stringify(result))
      const orders = {
        restID: restID,
        custID: custID,
        restName: restName,
        cart: result
      }
      localStorage.setItem("order", JSON.stringify(orders));
      this.setState({dummy: "  "})
    }
  }

  toggleModal = (e) =>{
    this.setState({
      isOpen: !this.state.isOpen,
    });
}

  render() {
    
    const orders = JSON.parse(localStorage.getItem("order")).cart
    const cartItems = (
        <ul>
      {orders.map((item) => (
        <SingleCartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          quantity={item.quantity}
          changeQuantity={this.handleChangeCart}
          isCart ={true}
        />
        ))}
    </ul>
  
    );
    var total= orders.reduce((total, obj) => (obj.quantity*obj.price) + total,0);
    const noOfItems = orders.reduce((curNumber, item) => {
      return curNumber + item.quantity;
    },0);
    return (
      <div>
       <button className={styles.button} onClick={this.toggleModal}>
        <div><ShoppingCartIcon/> Cart&#8226;{noOfItems}</div>
      </button>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.toggleModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <h2>Your Cart<IconButton style={{marginTop:"-12vh",marginLeft:"90%"}} onClick={this.toggleModal}><CloseIcon /></IconButton>
          </h2>
          {cartItems}
          <div>
            <Link to="/checkout" style={{width:"100%",backgroundColor: "black"}}className="btn btn-dark"> Go to checkout&#8226;${total.toFixed(2)}</Link>
          </div>
        </Modal>
      </div>
    );
  }
}