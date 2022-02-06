const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

async function handle_request(msg, callback) {
  try {
    let response = {};
    let error = {};
    Order.findOne()
      .sort("-order_id")
      .exec(function (err, orderno) {
        const {
          customer_id,
          restaurant_id,
          restaurantName,
          deliveryAddress,
          custOrderStatus,
          restOrderStatus,
          orderMode,
          orderItems,
          totalPrice,
          instructions,
        } = msg;
        const orderDate = new Date().toString();
        // const orderItemsStr = (orderItems);
        var orderNo = 1;
        if (orderno) orderNo = orderno.order_id + 1;
        console.log(orderNo);

        const orderDtls = new Order({
          order_id: orderNo,
          customer_id: customer_id,
          restaurant_id: restaurant_id,
          restaurantName,
          deliveryAddress,
          orderDate,
          custOrderStatus,
          restOrderStatus,
          orderMode,
          orderItems,
          totalPrice,
          instructions,
        });
        orderDtls
          .save()
          .then((result) => {
            console.log("orderDtls");
            response.status = 200;
            response.orderDtls = orderDtls;
            return callback(null, response);
            //return res.status(200).json({ orderDtls: result });
          })
          .catch((err) => {
            error.status = 400;
            error.message = "Error while inserting order details";
            error.data = err;
            return callback(error, null);
            //return res.status(400).json({ error: "Error while inserting order details" + err });
          });
      });
  } catch (err) {
    error.status = 400;
    error.message = "Error";
    error.data = err;
    return callback(error, null);
    //return res.status(400).json({ error: "errror" });
  }
}

exports.handle_request = handle_request;
