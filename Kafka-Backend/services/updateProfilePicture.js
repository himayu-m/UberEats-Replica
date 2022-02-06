const express = require("express");
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Customer = mongoose.model("Customer");

async function handle_request(msg, callback) {
  let response = {};
  let error = {};
  if ("Customer" === msg.role) {
    const { customer_id, picture_name } = msg;
    try {
      
      Customer.findOneAndUpdate(
        { customer_id: customer_id },
        { $set: { picture_url: picture_name } }
      )
        .then((result) => {
          response.status = 200;
          response.customerDtls = result;
          return callback(null, response);
          //return res.status(200).json({ customerDtls: result });
        })
        .catch((err) => {
          error.status = 400;
          error.message =
            "Error occurred while updating the customer profile picture";
          error.data = err;
          return callback(error, null);
          //return res.status(400).json({error:"Error occurred while updating the customer profile picture",});
        });
    } catch (err) {
      error.status = 400;
      error.data = err;
      return callback(error, null);
      //return res.status(400).json({ error: err });
    }
  } else if ("Restaurant" === msg.role) {
    const { restaurant_id, picture_name } = msg;
    try {
      Restaurant.findOneAndUpdate(
        { restaurant_id: restaurant_id },
        { $set: { picture_url: picture_name } }
      )
        .then((result) => {
          response.status = 200;
          response.customerDtls = result;
          return callback(null, response);
          //return res.status(200).json({ customerDtls: result });
        })
        .catch((err) => {
          error.status = 400;
          error.message =
            "Error occurred while updating the restaurant profile picture";
          error.data = err;
          return callback(error, null);
          //return res.status(400).json({error:"Error occurred while updating the restaurant profile picture"});
        });
    } catch (err) {
      error.status = 400;
      error.data = err;
      return callback(error, null);
      //return res.status(400).json({ error: err });
    }
  }
}

exports.handle_request = handle_request;
