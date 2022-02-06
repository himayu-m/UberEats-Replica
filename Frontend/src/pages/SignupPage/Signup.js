import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'	

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'Customer',
      name: '',
      city:'',
      email: '',
      password: '',
      dummy:""
    };
  }

  signUp = (e) => {
    e.preventDefault();
    // send POST request to "/signup route" on Backend
    axios.post('/api/signup', this.state)
      .then((response) => {
        console.log(response)
        if(response.status===200){
          this.setState({ name: '',
          city:'',
          email: '',
          password: ''})
          const CustomToast = ({closeToast})=>{
            return(
              <div  style={{textAlign:"center"}}>
                <h4>Successfully Created Account!</h4>
              </div>
            )
          }
          toast.success(<CustomToast />, {position: toast.POSITION.TOP_CENTER, autoClose:true})
        }
          
      }).catch(err => {
        console.log(err)
        toast.error("Unable to signup using these details", {position: toast.POSITION.TOP_CENTER});
    })
    
  }

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value
    });
  }

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
  cityChangeHandler = (e) => {
    this.setState({
      city: e.target.value
    });
  }

roleChangeHandler = (e) => {
  this.setState({
    role: e.target.value,
    name: '',
    email: '',
    city:'',
    password: ''
  });
  if (e.target.value==="Restaurant"){
      document.getElementById('res').classList.remove('hide');
      document.getElementById('res').setAttribute('required',true)
  }
  else{
      document.getElementById('res').classList.add('hide')
      document.getElementById('res').removeAttribute('required')
  }
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
  const { name, email, password, city} = this.state;
  return (
    <div  className="credentials">
    <form onSubmit={this.signUp} className="form-signin">
        <h1 className="mb-4 title">Uber<span style={{color:"#5fb709",marginLeft:4}}>Eats</span></h1>
        <h3 style={{marginLeft:"8vw"}} className="h3 mb-3 font-weight-normal signin">Sign up as</h3>
        <select onChange={this.roleChangeHandler} id="options">
          <option value="Customer">Customer</option>
          <option value="Restaurant">Restaurant</option>
        </select>
      <br/>
      <br/>
      <h4 style={{marginLeft:"0vh"}}className="h4 mb-3 font-weight-normal signin">Let's get started!</h4>
      <br/>
    {/* <label htmlFor="inputName" className="sr-only">Name</label> */}
    <input onChange={this.nameChangeHandler} value={name} type="username" name="name" className="form-control mb-3" placeholder="Name" required autoFocus autocomplete="off"/>
    {/* <label id="citylabel" htmlFor="inputCity" className="sr-only hide">City</label> */}
    <input id="res" onChange={this.cityChangeHandler} value={city} type="text" name="city" className="form-control mb-3 hide" placeholder="City" autocomplete="off" />
    {/* <label htmlFor="inputEmail" className="sr-only">Email Address</label> */}
    <input onChange={this.emailChangeHandler} value={email} type="email" name="email" className="form-control mb-3" placeholder="Email Address" required autoFocus autocomplete="off"/>
    {/* <label htmlFor="inputPassword" className="sr-only">Password</label> */}
    <input onChange={this.passwordChangeHandler} value={password} type="password" name="password" className="form-control mb-3" placeholder="Password" required autocomplete="off"/>     
      <button className="btn1 btn-lg btn-success btn-block" type="submit">Register</button>
    <br/>
    <p className="display--inline">Already use Uber? <a className="login-a" href="/login">Sign in</a></p>
    </form>
    </div>
  );
 }
}
