import React, { Component } from "react";
import axios from "axios";
import styles from "./RestaurantHeader.module.css";
import RestaurantDishes from "./RestaurantDishes";
import RestaurantHeader from "./RestaurantHeader";
import Cookies from "js-cookie";
import Footer from "../Customer/Footer";
import { connect } from "react-redux";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      address: "",
      timings: "",
      restaurant_id: "",
      phone_no: "",
      cuisine: "",
      picture_url: "",
      dishes: [],
    };
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
      //const user = JSON.parse(localStorage.getItem("user"));
      console.log("cdm");
      const restID = user.restaurant_id;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .get(`/api/getRestaurantDataById/${restID}`)
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
            });
            if (user1.picture_url) {
              this.setState({
                picture_url: user1.picture_url,
              });
            }
            axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
            axios
              .get(`/api/getAllDishesByRestId/${restID}`)
              .then((response) => {
                if (response.status === 200) {
                  const user2 = response.data.dishes;
                  this.setState({
                    dishes: user2,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const user = Cookies.get("Role");
    if (!user) {
      console.log("no cookies");
      window.location.replace("/");
    } else if (user === "Customer") {
      window.location.replace("/viewRestaurants");
    }
    return (
      <div>
        <RestaurantHeader />
        <div>
          <div>
            <img
              src={this.state.picture_url}
              className={styles["main-image"]}
              alt="Res"
            />
          </div>

          <div style={{ paddingLeft: 6 }}>
            <h4>{this.state.description}</h4>
            <h5>{this.state.cuisine}</h5>
            <h5>{this.state.address}</h5>
            <h5>{this.state.timings}</h5>
            <h5>{this.state.phone_no}</h5>
          </div>
          <div>
            <h2>Menu</h2>
            <RestaurantDishes dishes={this.state.dishes} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(Restaurant);
