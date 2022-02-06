const express = require("express");
const mongoose = require("mongoose");
const Dish = mongoose.model("Dish");

async function handle_request(msg, callback) {
  let response = {};
  let error = {};
  const restId = msg;
  //const restId = req.params.restId;
  try {
    Dish.find({ restaurant_id: restId })
      .then((result) => {
        console.log(result);
        response.status = 200;
        response.dishes = result;
        return callback(null, response);
        //return res.status(200).json({ dishes: result });;
      })
      .catch((err) => {
        console.log("Error occured while querying");
        error.status = 400;
        error.message = "Error occurred while getting dishes";
        error.data = err;
        return callback(error, null);
        //return res.status(400).send("Error occurred while getting dishes");
      });
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
