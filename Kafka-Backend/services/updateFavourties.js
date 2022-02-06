const express = require("express");
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

async function handle_request(msg, callback) {
  const fav = [...new Set(msg.favourites)];
  const customerId = msg.customer_id;
  try {
    let response = {};
    let error = {};
    Customer.findOneAndUpdate(
      { customer_id: customerId },
      { $set: { favourites: fav } }
    )
      .then((result) => {
        console.log(result);
        response.status = 200;
        response.favourites = result;
        return callback(null, response);
        //return res.status(200).json({ favourites: result });
      })
      .catch((err) => {
        console.log("Error occured while querying");
        error.status = 400;
        error.message = "Error occurred while updating favourites";
        error.data = err;
        return callback(error, null);
        //return res.status(400).send("Error occurred while updating favourites");
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
