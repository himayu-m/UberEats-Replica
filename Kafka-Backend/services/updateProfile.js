const express = require("express");
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Customer = mongoose.model("Customer");

async function handle_request(msg, callback) {
  console.log(msg);
  let response = {};
  let error = {};
  // console.log("inside update" + req.body.restaurant_id + typeof req.body.role);
  if ("Customer" === msg.role) {
    const {
      customer_id,
      name,
      email,
      dob,
      city,
      state,
      country,
      nickname,
      phone_no,
    } = msg;

    try {
      
      Customer.findOneAndUpdate(
        { customer_id: customer_id },
        {
          $set: {
            name: name,
            email: email,
            dob: dob,
            city: city,
            state: state,
            country: country,
            nickname: nickname,
            phone_no: phone_no,
          },
        }
      )
        .then((result) => {
          response.status = 200;
          response.customerDtls = result;
          return callback(null, response);
          //return res.status(200).json({ customerDtls: result });
        })
        .catch((err) => {
          error.status = 400;
          error.message = "Error occurred while updating the customer profile";
          error.data = err;
          return callback(error, null);
          //return res.status(400).json({error: "Error occurred while updating the customer profile",});
        });
    } catch (err) {
      error.status = 400;
      error.data = err;
      return callback(error, null);
      //return res.status(400).json({ error: err });
    }
  } else if ("Restaurant" === msg.role) {
    console.log("inside restaurant" + JSON.stringify(msg));
    const {
      restaurant_id,
      name,
      city,
      email,
      address,
      description,
      phone_no,
      timings,
      cuisine,
      mode,
      diet,
    } = msg;

    try {
      Restaurant.findOneAndUpdate(
        { restaurant_id: restaurant_id },
        {
          $set: {
            name: name,
            city: city,
            email: email,
            address: address,
            description: description,
            phone_no: phone_no,
            timings: timings,
            cuisine: cuisine,
            operationalMode: mode,
            dietaryPreference: diet,
          },
        }
      )
        .then((result) => {
          response.status = 200;
          response.restaurantDtls = result;
          return callback(null, response);
          //return res.status(200).json({ restaurantDtls: result });
        })
        .catch((err) => {
          error.status = 400;
          error.message = "Error occurred while updating the restaurant profile";
          error.data = err;
          return callback(error, null);
          //return res.status(400).json({error: "Error occurred while updating the restaurant profile",});
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
