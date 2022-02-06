import React, { Component } from "react";
import Modal from "react-modal";
import "./../Customer/Modal.css";
import SingleCartItem from "./../Customer/SingleCartItem";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";

class CustomerOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custOrderStatus: "Order Received",
      orderId: this.props.orderId,
      isOpen: false,
    };
  }

  toggleModal = (e) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  cancelOrder = (e) => {
    if (this.props.loginStateStore) {
      const token = this.props.loginStateStore.token;
      axios.defaults.headers.common["authorization"] = token; //localStorage.getItem('token');
      axios.post("/api/cancelOrder", this.state).then((response) => {
        if (response.status === 200) {
          console.log("cancelled");
          //this.props.history.push('/vieworders')
          window.location.reload();
        } else {
          toast.error("Unable to cancel", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      });
    }
  };

  render() {
    var canCancel = false;
    if (this.props.custOrderStatus === "Order Received") {
      canCancel = true;
    }
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

    //var total= itemArr.reduce((total, obj) => (obj.quantity*obj.price) + total,0);
    return (
      <div>
        <div>
          <h2>{this.props.restName}</h2>
          <div>
            Order Date/Time: {this.props.orderDate.slice(3, 15)} at{" "}
            {this.props.orderDate.slice(16, 21)}
          </div>
          <div>Mode: {this.props.mode}</div>
          <div>Order Status : {this.props.custOrderStatus}</div>

          <a onClick={this.toggleModal}>View Receipt</a>

          {canCancel && (
            <><br/>
            <button
              style={{ width: "40%", backgroundColor: "#EEEEEE" }}
              className="btn btn-light"
              onClick={this.cancelOrder}
            >
              Cancel Order
            </button></>
          )}

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
              <br />
              <div style={{ fontWeight: 500 }}>
                Delivery Address : {this.props.deliveryAddress}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStateStore: state.login,
});
export default connect(mapStateToProps, null)(CustomerOrderList);