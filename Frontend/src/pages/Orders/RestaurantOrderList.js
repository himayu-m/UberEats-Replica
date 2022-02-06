import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SingleCartItem from "./../Customer/SingleCartItem";
import Modal from "react-modal";
import "./../Customer/Modal.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { connect } from "react-redux";

class RestaurantOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custOrderStatus: "Order Received",
      orderId: "",
      isOpen: false,
      custID: this.props.customerId,
      customer_name: "",
    };
  }

  componentDidMount() {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios
        .get(`/api/getCustomerDataById/${this.state.custID}`)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              customer_name: response.data.customer.name,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderStatusButton = (mode) => {
    if (mode === "Delivery") {
      if (this.props.custOrderStatus === "Order Received") {
        return (
          <div>
            <select
              value={this.props.selected}
              onChange={this.orderDropdownChangeHandler}
            >
              <option value="none" selected hidden>
                {" "}
                Select an Option
              </option>
              <option value="Preparing">Preparing</option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled Order">Cancel Order</option>
            </select>
          </div>
        );
      } else if (this.props.custOrderStatus === "Preparing") {
        return (
          <div>
            <select
              value={this.props.selected}
              onChange={this.orderDropdownChangeHandler}
            >
              <option value="none" selected hidden>
                {" "}
                Select an Option
              </option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled Order">Cancel Order</option>
            </select>
          </div>
        );
      } else {
        return (
          <div>
            <select
              value={this.props.selected}
              onChange={this.orderDropdownChangeHandler}
            >
              <option value="none" selected hidden>
                {" "}
                Select an Option
              </option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled Order">Cancel Order</option>
            </select>
          </div>
        );
      }
    } else if (mode === "Pickup") {
      if (this.props.custOrderStatus === "Order Received") {
        return (
          <div>
            <select
              value={this.props.selected}
              onChange={this.orderDropdownChangeHandler}
            >
              <option value="none" selected hidden>
                {" "}
                Select an Option
              </option>
              <option value="Preparing">Preparing</option>
              <option value="Pickup Ready">Pickup Ready</option>
              <option value="Picked up">Picked up</option>
              <option value="Cancelled Order">Cancel Order</option>
            </select>
          </div>
        );
      } else if (this.props.custOrderStatus === "Preparing") {
        return (
          <div>
            <select
              value={this.props.selected}
              onChange={this.orderDropdownChangeHandler}
            >
              <option value="none" selected hidden>
                {" "}
                Select an Option
              </option>
              <option value="Pickup Ready">Pickup Ready</option>
              <option value="Picked up">Picked up</option>
              <option value="Cancelled Order">Cancel Order</option>
            </select>
          </div>
        );
      } else {
        return (
          <div>
            <select
              value={this.props.selected}
              onChange={this.orderDropdownChangeHandler}
            >
              <option value="none" selected hidden>
                {" "}
                Select an Option
              </option>
              <option value="Picked up">Picked up</option>
              <option value="Cancelled Order">Cancel Order</option>
            </select>
          </div>
        );
      }
    }
  };

  orderDropdownChangeHandler = (e) => {
    this.setState({ custOrderStatus: e.target.value });
  };

  toggleModal = (e) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  updateOrderStatus = (event) => {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      console.log("inside button");
      this.setState(
        {
          orderId: this.props.orderId,
        },
        function () {
          console.log("order status" + this.state.custOrderStatus);
          console.log("order id" + this.state.orderId);
          if ("Delivered" === this.state.custOrderStatus || "Picked up" ===this.state.custOrderStatus) {
            axios.defaults.headers.common["authorization"] = token //localStorage.getItem("token");
            axios
              .post("/api/updateOverallCustOrderStatus", this.state)
              .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                  console.log("updated");
                  this.props.history.push('/restaurantorders')
                  //window.location.reload();
                } else {
                  toast.error("Unable to update", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  return;
                }
              })
              .catch(() => {
                toast.error("Unknown error occured while updating", {
                  position: toast.POSITION.TOP_CENTER,
                });
              });
          } else if ("Cancelled Order" === this.state.custOrderStatus) {
            axios.defaults.headers.common["authorization"] = token //localStorage.getItem("token");
            axios
              .post("/api/cancelOrder", this.state)
              .then((response) => {
                if (response.status === 200) {
                  console.log("cancelled");
                  //this.props.history.push('/restaurantorders')
                  window.location.reload();
                } else {
                  toast.error("Unable to cancel", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  return;
                }
              })
              .catch(() => {
                toast.error("Unknown error occured while updating", {
                  position: toast.POSITION.TOP_CENTER,
                });
              });
          } else {
            axios.defaults.headers.common["authorization"] = token //localStorage.getItem("token");
            axios
              .post("/api/updateCustOrderStatus", this.state)
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  //this.props.history.push('/restaurantorders')
                  window.location.reload();
                  console.log("updated");
                } else {
                  toast.error("Unable to update", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  return;
                }
              })
              .catch(() => {
                toast.error("Unknown error occured while updating", {
                  position: toast.POSITION.TOP_CENTER,
                });
              });
          }
        }
      );
    }
  };

  render() {
    const itemArr = this.props.items;
    const cartItems = (
      <ul>
        {itemArr.map((item) => (
          <SingleCartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            quantity={item.quantity}
            changeQuantity={this.handleChangeCart}
          />
        ))}
      </ul>
    );
    return (
      <div>
        <div>
          <div>OrderId: {this.props.orderId}</div>
          <div>Customer Name: {this.state.customer_name} </div>
          <div>
            Order Date/Time: {this.props.orderDate.slice(3, 15)} at{" "}
            {this.props.orderDate.slice(16, 21)}
          </div>
          <div>Mode: {this.props.mode}</div>
          <div>Current Order Status: {this.props.custOrderStatus}</div>
          <a href onClick={this.toggleModal}>
            View Order
          </a>
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
            onRequestClose={this.toggleModal}
          >
            <div>
              <IconButton
                style={{ marginTop: "0%", marginLeft: "90%" }}
                onClick={this.toggleModal}
              >
                <CloseIcon />
              </IconButton>
              {cartItems}
              <div>
                <span style={{ marginLeft: "10vw", fontWeight: 500 }}>
                  Total Amount:
                </span>
                <span style={{ marginLeft: "10.7vw", fontWeight: 500 }}>
                  ${this.props.totalPrice}
                </span>
              </div>
              <div>Delivery Address : {this.props.deliveryAddress}</div>
            </div>
            {/* <div>
            <button onClick={this.toggleModal}>Close</button>
          </div> */}
          </Modal>
          <p>
            {!this.props.isDelivered &&
              this.renderStatusButton(this.props.mode)}
            {!this.props.isDelivered && (
              <button
                type="button"
                className="btn btn-light"
                onClick={this.updateOrderStatus}
              >
                Update Order Status
              </button>
            )}
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(RestaurantOrderList);