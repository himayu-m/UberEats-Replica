const express = require("express");
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Dish = mongoose.model("Dish");

async function handle_request(msg, callback) {
  console.log("HERREEEE" + msg)
  const city = msg;
  //const city = req.query.city
  try {
    let response = {};
    let error = {};
    const city = msg ? msg : "";
    console.log("Printing city" + city)
    if (city) {
      console.log("city exists");
      Restaurant.find({ city: city })
        .then((result) => {
          console.log(result);
          response.status = 200;
          response.restaurant = result;
          return callback(null, response);
          //return res.status(200).json({ restaurant: result });
        })
        .catch((err) => {
          console.log("Error occured while querying");
          error.status = 400;
          error.message = "Error occurred while getting restaurants by city";
          error.data = err;
          return callback(error, null);
          //return res.status(400).send("Error occurred while getting restaurants by city");
        });
    } else {
      console.log("city does not exist" + city);
      Restaurant.find({})
        .then((result) => {
          console.log(result);
          response.status = 200;
          response.restaurant = result;
          return callback(null, response);
          //return res.status(200).json({ restaurant: result });;
        })
        .catch((err) => {
          console.log("Error occured while querying");
          error.status = 400;
          error.message = "Error occurred while getting restaurants by city";
          error.data = err;
          return callback(error, null);
          //return res.status(400).send("Error occurred while getting restaurants by city");
        });
    }
  } catch {
    (err) => {
      error.status = 400;
      error.data = err;
      return callback(error, null);
      //return res.status(400).json({ error: err });
    };
  }
}

exports.handle_request = handle_request;
