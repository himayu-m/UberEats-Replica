import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RestaurantHeader from "./RestaurantHeader";
import Cookies from "js-cookie";
import { Card } from "react-bootstrap";
import Footer from "../Customer/Footer";
import { connect } from "react-redux";

class EditDishItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      dish_list: [],
      dish_id: "",
      name: "",
      price: "",
      desc: "",
      category: "",
      dietType: "",
      dish_image_url: "",
      dish_image: "",
    };
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
      //const user = JSON.parse(localStorage.getItem("user"));
      const restID = user.restaurant_id;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .get(`/api/getAllDishesByRestId/${restID}`)
        .then((response) => {
          if (response.status === 200) {
            const user2 = response.data.dishes;
            let result = user2.map((a) => a.dish_name);
            this.setState({
              dishes: user2,
              dish_list: result,
            });

            console.log(response.data);
            var select = document.getElementById("select-dish");
            for (var i = 0; i < result.length; i++) {
              var opt = result[i];
              var el = document.createElement("option");
              el.textContent = opt;
              el.value = opt;
              select.appendChild(el);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleEdit = (e) => {
    e.preventDefault();
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      var data = new FormData();
      data.append("file", this.state.dish_image);
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem("token");
      axios
        .post("/api/upload", data)
        .then((response) => {
          this.setState({ dish_image_url: response.data.imageLocation });
          if (response.status === 200) {
            axios.defaults.headers.common["authorization"] = token; //localStorage.getItem("token");
            axios
              .post("/api/editDish", this.state)
              .then((response) => {
                if (response.status === 200) {
                  //this.props.history.push('/editDish');
                  window.location.reload();
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
  };

  handleSelect = (e) => {
    e.preventDefault();
    var dish = this.state.dishes.filter((obj) => {
      return obj.dish_name === e.target.value;
    });
    this.setState(
      {
        dish_id: dish[0].dish_id,
        name: dish[0].dish_name,
        price: dish[0].dish_price,
        desc: dish[0].dish_desc,
        category: dish[0].dish_category,
        dietType: dish[0].dish_diet_type,
        dish_image_url: dish[0].dish_image_url,
      },
      function () {
        console.log(this.state.dish_image_url);
      }
    );
  };

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  priceChangeHandler = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  descChangeHandler = (e) => {
    this.setState({
      desc: e.target.value,
    });
  };

  categoryChangeHandler = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  dietTypeChangeHandler = (e) => {
    this.setState({
      dietType: e.target.value,
    });
  };

  photoUploadHandler = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    this.setState({
      dish_image: e.target.files[0],
      dish_image_url: URL.createObjectURL(e.target.files[0]),
    });
  };

  render() {
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Customer") {
      window.location.replace("/viewRestaurants");
    }
    return (
      <div>
        <RestaurantHeader />
        <div style={{ paddingLeft: 6, width: "50%" }}>
          <h2>Edit Dish</h2>
          <Card style={{ padding: 20 }}>
            <form onSubmit={this.handleEdit}>
              <h4>Select A Dish</h4>
              <select id="select-dish" onChange={this.handleSelect}>
                <option value="none" selected hidden>
                  {" "}
                  Select an Option
                </option>
              </select>
              <br />
              <br />
              <label>Name</label>
              <input
                type="text"
                value={this.state.name}
                onChange={this.nameChangeHandler}
                className="input-group mb-3"
                required
              />
              <label>Price</label>
              <input
                type="number"
                value={this.state.price}
                onChange={this.priceChangeHandler}
                className="input-group mb-3"
                required
              />
              <label>Description</label>
              <input
                type="text"
                value={this.state.desc}
                onChange={this.descChangeHandler}
                className="input-group mb-3"
                required
              />
              <label>Category</label>
              <select
                value={this.state.category}
                onChange={this.categoryChangeHandler}
                required
                className="input-group mb-3"
              >
                <option value="none" selected hidden>
                  {" "}
                  Select an Option
                </option>
                <option value="Appetizer">Appetizer</option>
                <option value="Salads">Salads</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
              <label>Diet Type</label>
              <select
                value={this.state.dietType}
                onChange={this.dietTypeChangeHandler}
                required
                className="input-group mb-3"
              >
                <option value="none" selected hidden>
                  {" "}
                  Select an Option
                </option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
              <div>
                <label htmlFor="Image">Dish Image:</label>
                <br />
                <img src={this.state.dish_image_url} height="200" />
                <input
                  type="file"
                  name="DishImage"
                  className="btn photo-upload-btn"
                  onChange={this.photoUploadHandler}
                />
              </div>
              <br />
              <button
                style={{ width: "100%" }}
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Edit
              </button>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(EditDishItem);
