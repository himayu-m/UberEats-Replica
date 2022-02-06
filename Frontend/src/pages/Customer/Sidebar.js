import React from "react";
import { slide as Menu } from "react-burger-menu";
import './Sidebar.css'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

const Sidebar=(props) => {
  if ("Customer" === props.role) {
    // console.log(props.role);
    return (
      <Menu disableAutoFocus>
        <Link to="/viewRestaurants">
          Home
        </Link>
        <Link to="/profile">
          Profile
        </Link>
        <Link to="/vieworders">
          My Orders
        </Link>
        <Link to="/favRestaurants">
          Favourites
        </Link>
        <button className="btnlog btn btn-dark"onClick={Logout}>
          Sign out
        </button>
      </Menu>
    );
  } else if ("Restaurant" === props.role) {
    // console.log(props.role);
    return (
      <Menu disableAutoFocus>
        <Link to="/restaurant">
          Home
        </Link>
        <Link to="/restaurantProfile">
          Profile
        </Link>
        <Link to="/restaurantorders">
          Orders
        </Link>

        <Link to="/addDish">
          Add Dish
        </Link>
        <Link to="/editDish">
          Edit Dish
        </Link>   
        <button className="btnlog btn btn-dark"onClick={Logout}>
          Sign out
        </button>
      </Menu>
    );
  }
};

const Logout = (e) => {
  localStorage.clear();
  Cookies.remove('Role')
  window.location.href="/"
}

export default Sidebar;
