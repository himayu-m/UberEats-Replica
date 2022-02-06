import React, { Component } from 'react'
import Cookies from 'js-cookie'
import './LandingPage.css'

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    
    login = (e) => {
        e.preventDefault();
        window.location.replace('/login')
    }

    render() {
      const user = Cookies.get('Role')       
      if (user){
        if(user==="Restaurant"){
          window.location.replace('/restaurant')
        }
        else if (user==="Customer"){
          window.location.replace('/viewRestaurants')
        }
      }
        return (
        <div className="landing" style={{backgroundImage:"url(/im2.jpg)"}}>
              <h1 style={{marginLeft:"3vw", marginTop:"2vh"}}>Uber<span style={{color:"#06c167", marginLeft:4}}>Eats</span></h1>
            <div className="button"><button className="bt1 btn-lg btn-light" onClick={this.login}>Sign in</button></div>
            <div className="content">Order your neighborhood's top spots</div>
        </div>
        );
      }
}