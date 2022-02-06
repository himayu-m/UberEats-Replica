import React, { Component } from 'react'
import axios from "axios"
import styles from './../Restaurant/RestaurantHeader.module.css';
import RestaurantDishes from "./../Restaurant/RestaurantDishes";
import CustomerHeader from "./CustomerHeader";
import Cookies from 'js-cookie'	
import { connect } from "react-redux";

class CustomerRestDishes extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name:'',
        description: '',
        address: '',
        timings: '',
        restaurant_id: '',
        phone_no: '',
        cuisine: '',
        picture_url:'',
        dishes: [],
        customerID:''
      }
  }
  
  componentDidMount() {
    console.log(this.props.loginStateStore);
    if (this.props.loginStateStore) {
      console.log("hello")
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
    //const user = JSON.parse(localStorage.getItem("user"));
    const custID = user.customer_id;
    this.setState({
      customerID: custID
    })
    const restID = this.props.location.state.restaurant_id
    axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
    axios.get(`/api/getRestaurantDataById/${restID}`)
    .then((response) => {
      if (response.status === 200) {
        const user1 = response.data.restaurant;
        this.setState({
          restaurant_id: user1.restaurant_id, 
          name: user1.name, 
          address: user1.address, 
          description: user1.description, 
          phone_no: user1.phone_no, 
          timings: user1.timings, 
          cuisine: user1.cuisine,
        })
        if (user1.picture_url){
          this.setState({
            picture_url: user1.picture_url
          })
        }
        axios.defaults.headers.common['authorization'] = token //localStorage.getItem('token');
        axios.get(`/api/getAllDishesByRestId/${restID}`)
        .then((response)=>{
          if (response.status === 200){
            const user2 = response.data.dishes;
            this.setState({
              dishes: user2
            })
          }
        }).catch((err) => {
          console.log(err);
          });
      }
    }).catch((err) => {
        console.log(err);
    });
  }
  }

  render() {
    console.log(this.props.location.state.restaurant_id)
    const user = Cookies.get('Role') 
    if(!user){
      window.location.replace('/')
    }
    else if (user==="Restaurant"){
      window.location.replace('/restaurant')
    }
    return (
      <div>
        <CustomerHeader/>
        <div >
          <div>
          <img src={this.state.picture_url} className={styles["main-image"]} alt="Res"/>
          </div>
          <div style={{paddingLeft:6}}>
            <h2>{this.state.name}</h2>
            <p>{this.state.description}</p>
            <p>{this.state.cuisine}</p>
            <p>{this.state.address}</p>
            <p>{this.state.timings}</p>
            <p>{this.state.phone_no}</p>
          </div>
          <br/>
          <div>
            <RestaurantDishes dishes={this.state.dishes} role={this.props.location.state.role} 
            restID={this.props.location.state.restaurant_id} custID = {this.state.customerID} 
            restName={ this.props.location.state.restName}/>
          </div>
          </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(CustomerRestDishes);