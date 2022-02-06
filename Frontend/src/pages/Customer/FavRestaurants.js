import React, { Component } from "react";
import axios from "axios";
import CustomerHeader from "./CustomerHeader";
import { toast } from "react-toastify";
import AllRestaurants from "./AllRestaurants";
import Cookies from "js-cookie";
import Footer from "./Footer";
import { connect } from "react-redux";

class FavRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id: "",
      name: "",
      operationalMode: "",
      dietaryPreference: "",
      restaurants: [],
      favourites: [],
    };
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
      //const user = JSON.parse(localStorage.getItem("user"));
      const custID = user.customer_id;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .get(`/api/getFavouriteRestaurants/${custID}`)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.restaurants;
            console.log("List of restaurants" + data);
            this.setState({ restaurants: data });
            axios.defaults.headers.common["authorization"] = token // localStorage.getItem("token");
            axios.get(`/api/getCustomerDataById/${custID}`).then((response) => {
              if (response.status === 200) {
                this.setState({
                  favourites: response.data.customer.favourites,
                });
              }
            });
          }
        })
        .catch(() => {
          toast.error("Unknown error occurred", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  }

  render() {
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Restaurant") {
      window.location.replace("/restaurant");
    }
    return (
      <div>
        <CustomerHeader />
        <div style={{}}>
          <AllRestaurants
            restaurantsList={this.state.restaurants}
            role="Customer"
            favourites={this.state.favourites}
            isFav={true}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(FavRestaurants);
