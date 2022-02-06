import React, { Component } from 'react'
import axios from "axios"
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
import { connect } from "react-redux";
import {loginUser} from "../../app/actions/action";
const jwt_decode = require("jwt-decode");

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          role: 'Customer',
          email: '',
          password: '',
        };
      }
    
      handleLogin = (e) => {
        e.preventDefault();
    
        //send POST request to "/login route" on Backend
        const { email, password, role } = this.state;
        axios.defaults.withCredentials = true;
        axios
          .post("/api/login", this.state)
          .then((response) => {
            console.log("Token retrieved " + response.data);
            var decoded = jwt_decode(response.data.split(" ")[1]);
            const user = decoded.user;
            console.log("User role " + user.role);
            console.log("User object " + JSON.stringify(decoded.user));
            if (response.status === 200) {
              if (role === "Customer" && user.role === "Customer") {
                
                //localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("mode", "Delivery");
                //localStorage.setItem("token", response.data);
                const orders = {
                  restID: "",
                  custID: "",
                  restName: "",
                  cart: [],
                };
                localStorage.setItem("order", JSON.stringify(orders));
                localStorage.setItem("city", "");
                const newUser = Object.keys(user).reduce((object, key) =>{
                  if(key === "customer_id" || key === "restaurant_id" || key === "role") {
                    object[key] = user[key]
                  }
                  return object
                }, {})
                let loginData = {
                  user: newUser,
                  token: response.data
                }
                this.props.loginUser(loginData);
                Cookies.set("Role", "Customer");
                this.props.history.push("/viewRestaurants");
              } else if (role === "Restaurant" && user.role === "Restaurant") {
                //localStorage.setItem("user", JSON.stringify(user));
                const orders = {
                  restID: "",
                  custID: "",
                  restName: "",
                  cart: [],
                };
                localStorage.setItem("order", JSON.stringify(orders));
                localStorage.setItem("city", "");
                const newUser = Object.keys(user).reduce((object, key) =>{
                  if(key === "customer_id" || key === "restaurant_id" || key === "role") {
                    object[key] = user[key]
                  }
                  return object
                }, {})
                let loginData = {
                  user: newUser,
                  token: response.data
                }
                this.props.loginUser(loginData);
                //localStorage.setItem("token", response.data);
                Cookies.set("Role", "Restaurant");
                this.props.history.push("/restaurant");
              } else {
                toast.error("You're signing in with incorrect role", {
                  position: toast.POSITION.TOP_CENTER,
                });
                return;
              }
            }
          })
          .catch(() => {
            toast.error("Incorrect Login Credentials", {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      };
    
    emailChangeHandler = (e) => {
      this.setState({
        email: e.target.value
      });
    }
    
    passwordChangeHandler = (e) => {
      this.setState({
        password: e.target.value
      });
    }
    
    roleChangeHandler = (e) => {
      console.log(e.target.value);
      this.setState({
        role: e.target.value,
        email: '',
        password: '',
      });
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
          <div className="credentials">
            <form onSubmit={this.handleLogin} className="form-signin">
              <h1 className="mb-4 title">Uber<span style={{color:"#5fb709",marginLeft:4}}>Eats</span></h1>
              <h2 style={{marginLeft:"8vw"}} className="h3 mb-3 font-weight-normal signin">Sign in as</h2>
              <select onChange={this.roleChangeHandler} id="options">
                <option value="Customer">Customer</option>
                <option value="Restaurant">Restaurant</option>
              </select>
              <br/>
              <br/>
              <h4 style={{marginLeft:"0vh"}}className="h4 mb-3 font-weight-normal signin">Welcome Back!</h4>
              <br/>
              {/* <label htmlFor="inputEmail" className="sr-only">Email</label> */}
              <input onChange={this.emailChangeHandler} value={this.state.email} type="email" name="email" className="form-control mb-3" placeholder="Email Address" required autoFocus />
              {/* <label htmlFor="inputPassword" className="sr-only">Password</label> */}
              <input onChange={this.passwordChangeHandler} value={this.state.password} type="password" name="password" className="form-control" placeholder="Password" required />
              <button className="btn1 btn-lg btn-success btn-block" type="submit">Sign in</button>
              <br/>
              <p className="display--inline">New to Uber? <a className="login-a" href="/signup">Create an account</a></p>

            </form>
          </div>
        );
      }
}
const mapDispatchToProps = dispatch => ({
  loginUser: (payload) => dispatch(loginUser(payload))
});
export default connect(null, mapDispatchToProps)(Login);