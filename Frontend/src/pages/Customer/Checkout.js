import React, { Component} from "react";
import axios from "axios";
import SingleCartItem from "./SingleCartItem";
import { Link } from 'react-router-dom';
import Address from './Address.js'
import CustomertHeader from "./CustomerHeader";
import Cookies from 'js-cookie'	
import Footer from "./Footer";
import { connect } from "react-redux";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id:'',
      restaurant_id:'',
      restaurantName:'',
      custOrderStatus:'Order Received',
      restOrderStatus:'New Order',
      orderMode:'',
      orderItems:[],
      totalPrice:'',
      address:[],
      isDelivery: true,
      deliveryAddress:'',
      instructions:""
    };
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
    //const user = JSON.parse(localStorage.getItem("user"));
    const custID = user.customer_id;
    this.setState({customer_id: custID}, function(){
      axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
      axios.get(`/api/getCustomerDataById/${this.state.customer_id}`)
      .then((response) => {
          const user1 = response.data.customer;
          if (user1.address && (localStorage.getItem("mode") === "Delivery")) {
              this.setState({ address: (user1.address) }, function(){
                var addList = [] 
                this.state.address.forEach(element => {
                  const {street, city, state,country,zip} = element
                  const add = street+", "+city+", "+state+", "+country+", "+zip
                  addList.push(add)
                });
                console.log(addList)              
                var select = document.getElementById("select-address");
                for(var i = 0; i < addList.length; i++) {
                  var opt = addList[i];
                  var el = document.createElement("option");
                  el.textContent = opt;
                  el.value = opt;
                  select.appendChild(el);
                }
              });
            }
      }).catch((err) => {
          console.log(err);
        });
    })
    const mode = (localStorage.getItem("mode"));
    if(mode==="Pickup"){
        this.setState({
          isDelivery: false
        })
    }
    const currentOrder = JSON.parse(localStorage.getItem("order"))
    this.setState({
        orderMode: mode,
        restaurant_id: currentOrder.restID,
        restaurantName: currentOrder.restName,
        orderItems: currentOrder.cart
    },function(){
        var total= this.state.orderItems.reduce((total, obj) => (obj.quantity*obj.price) + total,0);
        this.setState({totalPrice:total.toFixed(2)})
    })
  }
  }

  handleCheckout = (e) => {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
    e.preventDefault();
    axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
    axios.post('/api/placeOrder/',this.state)
    .then((response) => {
      if (response.status === 200){
        localStorage.setItem("mode", "Delivery")
        const orders = {
          restID: '',
          custID: '',
          restName:'',
          cart: []
        }
        localStorage.setItem("order", JSON.stringify(orders));
        this.props.history.push('/confirm');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  }

  addressChangeHandler = (e) =>{
    e.preventDefault();
    this.setState({
      deliveryAddress: e.target.value
    })
  }

  instructionsChangeHandler = (e) => {
    this.setState({
      instructions: e.target.value
    })
  };

  render() {
    const user = Cookies.get('Role') 
    if(!user){
      window.location.replace('/')
    }
    else if (user==="Restaurant"){
      window.location.replace('/restaurant')
    }
    const cartItems = (
    <ul>
    {this.state.orderItems.map((item) => (
      <SingleCartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        quantity={item.quantity}
        changeQuantity={this.handleChangeCart}
      />
      ))}
    </ul>
    );
    const {customer_id, address} = this.state
    return (
      <div>
        <CustomertHeader/>
        <div style={{paddingLeft:6}}>
          <h3>Your Items      {this.state.restaurant_id && <Link to={{
            pathname: "/res",
            state: { restaurant_id: this.state.restaurant_id,
            role:'Customer'}
              }} style={{marginLeft:"20vw"}}className="btn btn-sm btn-light">Add items</Link>}</h3>
       
            {cartItems}
            <div>
            <span style={{marginLeft:"10vw",fontWeight:500}}>Total Amount:</span>
            <span style={{marginLeft:"10.7vw",fontWeight:500}}>${this.state.totalPrice}</span>
          </div>
          <label style={{marginTop:"4vh",fontWeight:500}}>Special Instructions: </label>
            <input style={{width:"50%"}} type="text" value={this.state.instructions} onChange={this.instructionsChangeHandler} className="input-group mb-3"/>
            {this.state.isDelivery && (
            <><label style={{marginTop:"4vh",fontWeight:500}}>Select an Address</label>
            <select style={{marginBottom:"2vh"}} id="select-address" onChange={this.addressChangeHandler}>
            <option value="none" selected hidden> Select an Option</option>
            </select>
            
            <Address address={address} customer_id={customer_id} /></>)}
            <br/>
            {!this.state.isDelivery && <h4>Pickup from {this.state.restaurantName}</h4>}
            
            <button style={{width:"35%"}}className="btn btn-lg btn-success" onClick={this.handleCheckout}>Place Order</button>
        </div>
         <Footer/>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(Checkout);