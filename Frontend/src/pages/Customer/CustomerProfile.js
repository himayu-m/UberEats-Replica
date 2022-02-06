import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Address from "./Address.js";
import CustomerHeader from "./CustomerHeader.js";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import Footer from "./Footer.js";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Customer.css";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { connect } from "react-redux";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: "",
      name: "",
      email: "",
      city: "",
      dob: "",
      address: [],
      state: "",
      phone_no: "",
      country: "",
      nickname: "",
      favourites: [],
      role: "",
      picture: "",
      picture_name: "",
      addList: [],
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
        .get(`/api/getCustomerDataById/${custID}`)
        .then((response) => {
          if (response.status === 200) {
            var ele = document.querySelectorAll('[id="edit"]');
            for (var i = 0; i < ele.length; i++) {
              ele[i].disabled = true;
            }
            const user1 = response.data.customer;
            this.setState({
              customer_id: user1.customer_id,
              name: user1.name,
              email: user1.email,
              dob: user1.dob,
              phone_no: user1.phone_no,
              city: user1.city,
              state: user1.state,
              country: user1.country,
              nickname: user1.nickname,
              role: user1.role,
            });
            if (user1.address) {
              this.setState({ address: user1.address });
            }
            if (user1.favourites) {
              this.setState({ favourites: user1.favourites });
            }
            if (user1.picture_url) {
              this.setState({
                picture_name: user1.picture_url,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleUpdate = (e) => {
    e.preventDefault();
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .post("/api/updateProfile", this.state)
        .then((response) => {
          if (response.status === 200) {
            var ele = document.querySelectorAll('[id="edit"]');
            for (var i = 0; i < ele.length; i++) {
              ele[i].disabled = true;
            }
            toast.success("Successfully updated profile", {
              position: toast.POSITION.TOP_CENTER,
            });
            this.props.history.push("/profile");
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
    var ele = document.querySelectorAll('[id="edit"]');
    for (var i = 0; i < ele.length; i++) {
      ele[i].disabled = false;
    }
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

  dobChangeHandler = (e) => {
    this.setState({
      dob: e.target.value,
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

  stateChangeHandler = (e) => {
    this.setState({
      state: e,
    });
  };

  countryChangeHandler = (e) => {
    this.setState({
      country: e,
    });
  };

  nicknameChangeHandler = (e) => {
    this.setState({
      nickname: e.target.value,
    });
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

      axios.defaults.headers.common["authorization"] = token //localStorage.getItem("token");
      axios.post("/api/upload", data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ picture_name: response.data.imageLocation }, () => {
              axios.defaults.headers.common["authorization"] = token //localStorage.getItem("token");
              axios.post("/api/updateProfilePicture", this.state)
                .then((response) => {
                  if (response.status === 200) {
                    toast.success("Successfully changed profile picture", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    this.props.history.push("/profile");
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
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Restaurant") {
      window.location.replace("/restaurant");
    }
    const { country, state } = this.state;
    const { customer_id, address } = this.state;
    const Input = styled("input")({
      display: "none",
    });
    return (
      <div>
        <div>
          <CustomerHeader />
          <div style={{ paddingLeft: 6 }}>
            <Container>
              <Row>
                <Col style={{ marginTop: "10vh" }}>
                  <Avatar
                    src={this.state.picture_name}
                    sx={{ width: 250, height: 250 }}
                  />

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
                        id="edit"
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
                        id="edit"
                        onChange={this.emailChangeHandler}
                        value={this.state.email}
                        type="email"
                        name="email"
                        className="input-group mb-3"
                        disabled
                        required
                      />
                      <label htmlFor="inputDOB"> Date of Birth</label>
                      <input
                        id="edit"
                        onChange={this.dobChangeHandler}
                        value={this.state.dob}
                        type="date"
                        name="dob"
                        className="input-group mb-3"
                        disabled
                      />
                      <label htmlFor="inputContact"> Contact Info </label>
                      <input
                        id="edit"
                        onChange={this.contactChangeHandler}
                        value={this.state.phone_no}
                        type="text"
                        name="contact_info"
                        pattern="[0-9]{10}"
                        className="input-group mb-3"
                        disabled
                      />
                      <label htmlFor="inputCity"> City </label>
                      <input
                        id="edit"
                        onChange={this.cityChangeHandler}
                        value={this.state.city}
                        type="text"
                        name="city"
                        className="input-group mb-3"
                        disabled
                      />
                      <label htmlFor="inputState"> State </label>
                      <RegionDropdown
                        id="edit"
                        className="input-group mb-3"
                        country={country}
                        value={state}
                        onChange={(val) => this.stateChangeHandler(val)}
                      />
                      <label htmlFor="inputCountry"> Country </label>
                      <CountryDropdown
                        id="edit"
                        className="input-group mb-3"
                        value={country}
                        onChange={(val) => this.countryChangeHandler(val)}
                      />
                      <label htmlFor="inputNickname"> Nickname </label>
                      <input
                        id="edit"
                        onChange={this.nicknameChangeHandler}
                        value={this.state.nickname}
                        type="text"
                        name="nickname"
                        className="input-group mb-3"
                        disabled
                      />
                      <button
                        style={{ width: "100%" }}
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        {" "}
                        Save Changes{" "}
                      </button>
                    </form>
                  </Card>

                  <div style={{ marginTop: "2.5vh" }}>
                    <h3>Saved Addresses</h3>
                    {this.state.address.map((add) => (
                      <Card style={{ width: "100%", marginTop: 10 }}>
                        <div>
                          <div>{add.street}</div>
                          <div>{add.city}</div>
                          <div>{add.state}</div>
                          <div>{add.country}</div>
                          <div>{add.zip}</div>
                        </div>
                      </Card>
                    ))}
                    <br />
                    <Address address={address} customer_id={customer_id} />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <br />
          <br />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(CustomerProfile);
