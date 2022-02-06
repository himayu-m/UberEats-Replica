const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

async function handle_request(msg, callback) {
  try {
    let response = {};
    let error = {};
    const { custOrderStatus, orderId } = msg;
    const restOrderStatus = "Delivered Order";
    Order.findOneAndUpdate(
      { order_id: orderId },
      {
        $set: {
          custOrderStatus: custOrderStatus,
          restOrderStatus: restOrderStatus,
        },
      }
    )
      .then((result) => {
        response.status = 200;
        response.message = "Order status updated successfully";
        return callback(null, response);
        //return res.status(200).send("Order status updated successfully");
      })
      .catch((err) => {
        error.status = 400;
        error.message = "Error while updating overall customer order status";
        error.data = err;
        return callback(error, null);
        //return res.status(400).json({error: "Error while updating overall customer order status",});
      });
  } catch (err) {
    error.status = 400;
    error.data = err;
    return callback(error, null);
    //return res.status(400).json({ error: err });
  }
}

exports.handle_request = handle_request;

// Testing place order via postman
// {
//   "customer_id":1,
//   "restaurant_id":1,
//   "restaurantName":"DishDash",
//   "deliveryAddress":"Test address",
//   "custOrderStatus":"Order Received",
//   "restOrderStatus":"Order Received",
//   "orderMode":"Delivery",
//   "orderItems":[{"n": "Test", "qty": 2}],
//   "totalPrice":10.99,
//   "instructions":"Test"
// }
