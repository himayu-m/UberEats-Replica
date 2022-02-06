const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

async function handle_request(msg, callback) {
  try {
    let response = {};
    let error = {};
    const { custOrderStatus, orderId } = msg;
    Order.findOneAndUpdate(
      { order_id: orderId },
      {
        $set: {
          custOrderStatus: custOrderStatus,
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
        error.message = "Error while updating customer order status";
        error.data = err;
        return callback(error, null);
        //return res.status(400).json({ error: "Error while updating customer order status" });
      });
  } catch (err) {
    error.status = 400;
    error.data = err;
    return callback(error, null);
    //return res.status(400).json({ error: err });
  }
}

exports.handle_request = handle_request;
