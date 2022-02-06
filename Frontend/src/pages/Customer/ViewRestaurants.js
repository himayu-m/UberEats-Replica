import React, { Component } from "react";
import axios from "axios";
import CustomerHeader from "./CustomerHeader";
import { toast } from "react-toastify";
import AllRestaurants from "./AllRestaurants";
import Cookies from "js-cookie";
import { GiSolidLeaf, GiMeat, GiPlantsAndAnimals } from "react-icons/gi";
import "./Customer.css";
import Footer from "./Footer";
import { connect } from "react-redux";

class ViewRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_id: "",
      name: "",
      operationalMode: localStorage.getItem("mode"),
      dietaryPreference: [],
      restaurants: [],
      dish_list: [],
      diet_type: new Map(),
      customer_id: "",
      favourites: [],
      givenCity: localStorage.getItem("city"),
      role: "",
      searchInput: "",
    };
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      this.fetchCustomerData();
      const token = this.props.loginStateStore.token;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .get("/api/getRestaurantDtlsByCity/", {
          params: { city: this.state.givenCity },
        })
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.restaurant;
            this.setState({ restaurants: data });
          }
        })
        .catch(() => {
          toast.error("Unknown error occurred", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  }

  fetchCustomerData = () => {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
      //const user = JSON.parse(localStorage.getItem("user"));
      const custID = user.customer_id;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios.get(`/api/getCustomerDataById/${custID}`).then((response) => {
        if (response.status === 200) {
          const user1 = response.data.customer;
          this.setState({
            customer_id: user1.customer_id,
            role: user1.role,
          });
          if (user1.favourites) {
            this.setState({ favourites: user1.favourites });
          }
          if (!localStorage.getItem("city")) {
            this.setState({ givenCity: user1.city });
          }
        }
      });
    }
  };

  setMode = (e) => {
    e.preventDefault();
    this.setState(
      {
        operationalMode: e.target.value,
      },
      function () {
        localStorage.setItem("mode", e.target.value);
      }
    );
  };

  dietChangeHandler = (e) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(
      (prevState) => ({
        diet_type: prevState.diet_type.set(item, isChecked),
      }),
      function () {
        const map1 = new Map(
          [...this.state.diet_type].filter(([k, v]) => v === true)
        );
        this.setState({
          dietaryPreference: Array.from(map1.keys()),
        });
      }
    );
  };

  searchChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      searchInput: e.target.value,
    });
  };

  cityChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      givenCity: e.target.value,
    });
  };

  render() {
    //console.log(this.props.loginStateStore);

    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Restaurant") {
      window.location.replace("/restaurant");
    }

    const diet = this.state.dietaryPreference;
    var indents = [];

    const modeFilter = this.state.restaurants.filter((res) => {
      const delivery =
        res.operationalMode === this.state.operationalMode ||
        res.operationalMode === "Pickup and Delivery";
      return delivery;
    });

    let dietFilter = modeFilter;
    if (diet.length > 0) {
      dietFilter = modeFilter.filter((res) => {
        const res_diet = res.dietaryPreference;
        if (res_diet) {
          const isDiet = diet.some((val) => res_diet.indexOf(val) !== -1);
          return isDiet;
        }
        return false;
      });
    }

    const cityFilter = dietFilter.filter((res) => {
      if (this.state.givenCity) {
        const city =
          res.city.trim().toLowerCase() ===
          this.state.givenCity.trim().toLowerCase();
        return city;
      } else {
        return true;
      }
    });

    const searchFilter = cityFilter.filter((res) => {
      var isDish = false;
      var isCuisine = false;
      if (res.dish_list) {
        const dish_ind = res.dish_list.findIndex((element) =>
          element
            .trim()
            .toLowerCase()
            .includes(this.state.searchInput.trim().toLowerCase())
        );
        isDish = dish_ind !== -1 ? true : false;
      }
      if (res.cuisine) {
        isCuisine =
          res.cuisine.trim().toLowerCase() ===
          this.state.searchInput.trim().toLowerCase();
      }

      const search =
        isCuisine ||
        isDish ||
        res.name.trim().toLowerCase() ===
          this.state.searchInput.trim().toLowerCase();
      if (this.state.searchInput) {
        return search;
      } else {
        return true;
      }
    });

    const resList = (
      <AllRestaurants
        restaurantsList={searchFilter}
        role={this.state.role}
        favourites={this.state.favourites}
      />
    );
    if (cityFilter.length > 0) {
      indents.push(resList);
    }

    return (
      <div>
        <CustomerHeader />
        <div style={{ paddingLeft: 6 }}>
          <div className="row" style={{ width: "100%", height: "100%" }}>
            <div className="col-lg-1 col-md-4">
              <h4>Dietary</h4>
              <div>
                <article class="feature1">
                  <input
                    type="checkbox"
                    id="feature1"
                    value="Vegan"
                    onChange={this.dietChangeHandler}
                  />
                  <div>
                    <span>
                      <GiSolidLeaf /> Vegan
                    </span>
                  </div>
                </article>
                <article class="feature2">
                  <input
                    type="checkbox"
                    id="feature2"
                    value="Vegetarian"
                    onChange={this.dietChangeHandler}
                  />
                  <div>
                    <span>
                      <GiPlantsAndAnimals /> Vegetarian
                    </span>
                  </div>
                </article>
                <article class="feature3">
                  <input
                    type="checkbox"
                    id="feature3"
                    value="Non-Veg"
                    onChange={this.dietChangeHandler}
                  />
                  <div>
                    <span>
                      <GiMeat /> Non-Veg
                    </span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-11 col-md-8">{indents}</div>
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
export default connect(mapStateToProps, null)(ViewRestaurants);
