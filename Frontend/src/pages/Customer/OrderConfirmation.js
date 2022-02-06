import React, { Component } from "react";
import CustomertHeader from "./CustomerHeader";
import Cookies from 'js-cookie'	
import Footer from "./Footer";


export default class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const user = Cookies.get('Role') 
    if(!user){
      window.location.replace('/')
    }
    else if (user==="Restaurant"){
      window.location.replace('/restaurant')
    }
    
    return (
      <div>
        <CustomertHeader/>
        <div style={{paddingLeft:6}}>
            <h2>Your order has been successfully placed</h2>
        </div>
         <Footer/>
      </div>
    );
  }
}
