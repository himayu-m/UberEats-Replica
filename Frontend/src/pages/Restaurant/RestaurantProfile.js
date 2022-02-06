import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RestaurantHeader from "./RestaurantHeader";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Container, Row, Col, Card } from "react-bootstrap";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import Footer from "../Customer/Footer";
import { connect } from "react-redux";

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      email: "",
      address: "",
      description: "",
      phone_no: "",
      timings: "",
      cuisine: "",
      restaurant_id: "",
      role: "",
      mode: "",
      dietaryPreference: "",
      picture: "",
      picture_name: "",
      categories: [
        { id: 1, value: "Vegan" },
        { id: 2, value: "Vegetarian" },
        { id: 3, value: "Non-Veg" },
      ],
      diet_type: new Map(),
      diet: [],
    };
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      const user = this.props.loginStateStore.user;
      const token = this.props.loginStateStore.token;
      const dt = new Map();
      dt.set("Vegan", false).set("Vegetarian", false).set("Non-Veg", false);
      this.setState({ diet_type: dt });
      //const user = JSON.parse(localStorage.getItem("user"));
      const restID = user.restaurant_id;
      //console.log(user);
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .get(`/api/getRestaurantDataById/${restID}`)
        .then((response) => {
          if (response.status === 200) {
            var ele = document.querySelectorAll('[id="edit"]');
            for (var i = 0; i < ele.length; i++) {
              ele[i].disabled = true;
            }
            const user1 = response.data.restaurant;
            this.setState({
              restaurant_id: user1.restaurant_id,
              name: user1.name,
              city: user1.city,
              email: user1.email,
              address: user1.address,
              description: user1.description,
              phone_no: user1.phone_no,
              timings: user1.timings,
              cuisine: user1.cuisine,
              role: user1.role,
              mode: user1.operationalMode,
            });
            if (user1.picture_url) {
              this.setState({
                picture_name: user1.picture_url,
              });
            }
            if (user1.dietaryPreference) {
              this.setState({
                diet: user1.dietaryPreference,
              });
            }
            console.log(this.state.diet);
            const rdiet = user1.dietaryPreference;
            rdiet.forEach(
              function (item, index) {
                dt.set(item, true);
              },
              function () {
                this.setState({ diet_type: dt });
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleUpdate = (e) => {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      e.preventDefault();
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .post("/api/updateProfile", this.state)
        .then((response) => {
          if (response.status === 200) {
            // var ele = document.querySelectorAll('[id="edit1"]');
            // for (var i = 0; i <= ele.length; i++) {
            //   ele[i].disabled = true;
            // }
            toast.success("Successfully updated profile", {
              position: toast.POSITION.TOP_CENTER,
            });
            this.props.history.push("/restaurantProfile");
            //window.location.reload();
          }
        })
        .catch((err) => {
          toast.error("Unable to update profile", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(err);
        });
    }
  };

  makeEditable = (e) => {
    e.preventDefault();
    // console.log("edit"+[...this.state.diet_type.entries()])
    var ele = document.querySelectorAll('[id="edit1"]');
    for (var i = 0; i < ele.length; i++) {
      ele[i].disabled = false;
    }
    console.log(this.state.diet);
  };

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  contactChangeHandler = (e) => {
    this.setState({
      phone_no: e.target.value,
    });
  };

  cityChangeHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  addressChangeHandler = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  descriptionChangeHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  timingsChangeHandler = (e) => {
    this.setState({
      timings: e.target.value,
    });
  };

  cuisineChangeHandler = (e) => {
    this.setState({
      cuisine: e.target.value,
    });
  };

  deliveryChangeHandler = (e) => {
    this.setState({
      mode: e.target.value,
    });
  };

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  dietChangeHandler = (e) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(
      (prevState) => ({
        diet_type: prevState.diet_type.set(item, isChecked),
      }),
      function () {
        console.log(this.state.diet_type);
        const map1 = new Map(
          [...this.state.diet_type].filter(([k, v]) => v === true)
        );
        this.setState({
          diet: Array.from(map1.keys()),
        });
      }
    );
  };

  photoUploadHandler = (e) => {
    e.preventDefault();
    this.setState({
      picture: e.target.files[0],
      picture_name: URL.createObjectURL(e.target.files[0]),
    });
  };

  uploadPhoto = (e) => {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      var data = new FormData();
      data.append("file", this.state.picture);
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem("token");
      axios
        .post("/api/upload", data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ picture_name: response.data.imageLocation }, () => {
              axios.defaults.headers.common["authorization"] = token; // localStorage.getItem("token");
              axios
                .post("/api/updateProfilePicture", this.state)
                .then((response) => {
                  if (response.status === 200) {
                    toast.success("Successfully changed profile picture", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    this.props.history.push('//restaurantProfile')
                    //window.location.reload();
                  }
                })
                .catch((err) => {
                  toast.error("Unable to change profile picture", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  console.log(err);
                });
            });
          }
        })
        .catch((err) => {
          toast.error("Unable to change profile picture", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(err);
        });
    }
  };

  render() {
    // console.log(this.state.diet_type);
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Customer") {
      window.location.replace("/viewRestaurants");
    }
    const Input = styled("input")({
      display: "none",
    });
    return (
      <div>
        <RestaurantHeader />
        <div style={{ paddingLeft: 6 }}>
          <Container>
            <Row>
              <Col style={{ marginTop: "10vh" }}>
                <Avatar
                  src={this.state.picture_name}
                  sx={{ width: 250, height: 250 }}
                />
                {/* <img src={this.state.picture_name} width="250" height="250"/> */}
                <label htmlFor="icon-button-file">
                  <Input
                    id="icon-button-file"
                    type="file"
                    onChange={this.photoUploadHandler}
                  />
                  <IconButton
                    style={{ marginTop: "2vh", marginLeft: "4vw" }}
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                  <button
                    style={{ marginTop: 10 }}
                    className="btn btn-secondary"
                    onClick={this.uploadPhoto}
                  >
                    Upload
                  </button>
                </label>
              </Col>
              <Col style={{ marginLeft: "-40vw", marginTop: "1vh" }}>
                <h2>
                  Profile
                  <IconButton
                    style={{ marginLeft: "1vw" }}
                    aria-label="edit"
                    onClick={this.makeEditable}
                  >
                    <EditIcon />
                  </IconButton>
                </h2>
                <Card style={{ padding: 20 }}>
                  <form onSubmit={this.handleUpdate} className="form-update">
                    <label htmlFor="inputName">Name</label>
                    <input
                      id="edit1"
                      onChange={this.nameChangeHandler}
                      value={this.state.name}
                      type="text"
                      name="name"
                      className="input-group mb-3"
                      disabled
                      required
                    />
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      id="edit1"
                      onChange={this.emailChangeHandler}
                      value={this.state.email}
                      type="email"
                      name="email"
                      className="input-group mb-3"
                      disabled
                      required
                    />
                    <label htmlFor="inputContact">Contact Info</label>
                    <input
                      id="edit1"
                      onChange={this.contactChangeHandler}
                      value={this.state.phone_no}
                      type="text"
                      name="contact_info"
                      pattern="[0-9]{10}"
                      className="input-group mb-3"
                      disabled
                    />
                    <label htmlFor="inputCity">City</label>
                    <input
                      id="edit1"
                      onChange={this.cityChangeHandler}
                      value={this.state.city}
                      type="text"
                      name="city"
                      className="input-group mb-3"
                      disabled
                      required
                    />
                    <label htmlFor="inputAddress">Address</label>
                    <input
                      id="edit1"
                      onChange={this.addressChangeHandler}
                      value={this.state.address}
                      type="text"
                      name="address"
                      className="input-group mb-3"
                      disabled
                    />
                    <label htmlFor="inputDescription">Description</label>
                    <input
                      id="edit1"
                      onChange={this.descriptionChangeHandler}
                      value={this.state.description}
                      type="text"
                      name="description"
                      className="input-group mb-3"
                      disabled
                    />
                    <label htmlFor="inputTimings">Timings</label>
                    <input
                      id="edit1"
                      onChange={this.timingsChangeHandler}
                      value={this.state.timings}
                      type="text"
                      name="timings"
                      className="input-group mb-3"
                      disabled
                    />
                    <label htmlFor="inputCuisine">Cuisine</label>
                    <input
                      id="edit1"
                      onChange={this.cuisineChangeHandler}
                      value={this.state.cuisine}
                      type="text"
                      name="cuisine"
                      className="input-group mb-3"
                      disabled
                    />
                    <label htmlFor="inputDelivery">Delivery Mode: </label>
                    <select
                      id="edit1"
                      onChange={this.deliveryChangeHandler}
                      value={this.state.mode}
                      disabled
                    >
                      <option value="none" selected hidden>
                        {" "}
                        Select an Option
                      </option>
                      <option value="Pickup">Pickup</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Pickup and Delivery">
                        Pickup and Delivery
                      </option>
                    </select>
                    <br />
                    <label style={{ marginTop: 5 }} htmlFor="inputDiet">
                      Diet:{" "}
                    </label>
                    {this.state.categories.map((item) => (
                      <label>
                        <input
                          id="edit1"
                          type="checkbox"
                          value={item.value}
                          checked={
                            this.state.diet.includes(item.value) ? true : false
                          }
                          onChange={this.dietChangeHandler}
                          disabled
                        />{" "}
                        {item.value}
                      </label>
                    ))}
                    <button
                      style={{ width: "100%", marginTop: 5 }}
                      className="btn btn-primary btn-block"
                      type="submit"
                    >
                      {" "}
                      Save Changes{" "}
                    </button>
                  </form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(RestaurantProfile);
