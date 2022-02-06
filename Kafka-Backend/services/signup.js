"use strict";
const express = require("express");
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Restaurant = mongoose.model("Restaurant");
const bcrypt = require("bcryptjs");

async function handle_request(msg, callback) {
  try {
    let response = {};
    let error = {};
    const name = msg.name;
    const emailId = msg.email;
    const pwd = msg.password;
    const role = msg.role;
    const city = msg.city;

    if ("Customer" === role) {
      Customer.findOne({ email: emailId }, async function (err, obj) {
        if (err) {
          error.status = 400;
          error.message = "Unknown error occured";
          error.data = err;
          return callback(error, null);
          //res.status(400).send("Unknown error occured");
        }
        if (obj) {
          console.log("already registered");
          error.status = 400;
          error.message = "Customer already registered with this emailId";
          return callback(error, null);
          //res.status(400).send("Customer already registered with this emailId");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPwd = await bcrypt.hash(pwd, salt);

          Customer.findOne()
            .sort("-customer_id")
            .exec(function (err, custId) {
              var customerId = 1;
              if (custId) customerId = custId.customer_id + 1;

              const customer = new Customer({
                customer_id: customerId,
                name,
                email: emailId,
                password: hashPwd,
                role,
              });
              customer
                .save()
                .then((result) => {
                  response.status = 200;
                  response.customerDtl = result;
                  return callback(null, response);
                  //res.status(200).json({ customerDtl: result });
                })
                .catch((err) => {
                  console.log(err);
                  error.status = 400;
                  error.message = "Error while saving the customer object";
                  error.data = err;
                  return callback(error, null);
                  //res.status(400).send("Error while saving the customer object");
                });
            });
        }
      });
    } else if ("Restaurant" === role) {
      Restaurant.findOne({ email: emailId }, async function (err, obj) {
        if (err) {
          error.status = 400;
          error.message = "Unknown error occured";
          error.data = err;
          return callback(error, null);
          //res.status(400).send("Unknown error occured");
        }
        if (obj) {
          console.log("already registered");
          error.status = 400;
          error.message = "Restaurant already registered with this emailId";
          error.data = err;
          return callback(error, null);
          //res.status(400).send("Restaurant already registered with this emailId");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPwd = await bcrypt.hash(pwd, salt);

          Restaurant.findOne()
            .sort("-restaurant_id")
            .exec(function (err, restId) {
              var restaurantId = 1;
              if (restId) restaurantId = restId.restaurant_id + 1;

              const restaurant = new Restaurant({
                restaurant_id: restaurantId,
                name,
                email: emailId,
                password: hashPwd,
                city,
                role,
              });
              console.log("inserted" + restaurantId);
              restaurant
                .save()
                .then((result) => {
                  response.status = 200;
                  response.restaurantDtl = result;
                  return callback(null, response);
                  //return res.status(200).json({ restaurantDtl: result });
                })
                .catch((err) => {
                  console.log(err);
                  error.status = 400;
                  error.message = "Error while saving the restaurant object";
                  error.data = err;
                  return callback(error, null);
                  //return res.status(400).send("Error while saving the restaurant object");
                });
            });
        }
      });
    }
  } catch (error) {
    console.log(error);
    error.status = 400;
    error.message = "Error while registering";
    error.data = err;
    return callback(error, null);
    //return res.status(400).send("Error while registering");
  }
}

exports.handle_request = handle_request;
