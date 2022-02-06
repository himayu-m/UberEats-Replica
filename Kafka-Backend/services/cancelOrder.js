const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

async function handle_request(msg, callback) {
  let response = {};
  let error = {};

    try {
        const { orderId } = msg;
        const custOrderStatus = "Cancelled Order";
        const restOrderStatus = "Cancelled Order";
          Order.findOneAndUpdate({ "order_id": orderId }, {
              "$set": {
                  "custOrderStatus": custOrderStatus,
                  "restOrderStatus": restOrderStatus
              }
          }).then(result => {
            response.status = 200;
            response.message = "Order cancelled successfully";
            return callback(null, response);
            //return res.status(200).send("Order cancelled successfully");
          }).catch(err => {
            error.status = 400;
            error.message = "Error while cancelling customer order";
            error.data = err;
            return callback(error, null);
            //return res.status(400).json({ error: "Error while canelling customer order" });
            })
      }
      catch (err) {
        error.status = 400;
        error.data = err;
        return callback(error, null);
        //return res.status(400).json({ error: err });
      }
}

exports.handle_request = handle_request;