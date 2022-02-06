const express = require("express");
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

async function handle_request(msg, callback) {
  try {
    let response = {};
    let error = {};
    const address = msg.address;
    const customerId = msg.customer_id;
    Customer.findOneAndUpdate(
      { customer_id: customerId },
      { $set: { address: address } }
    )
      .then((result) => {
        response.status = 200;
        response.json = { customerDtls: result };
        return callback(null, response);
        //res.status(200).json({ customerDtls: result });
      })
      .catch((err) => {
        error.status = 400;
        error.message = "Error while updating customer address";
        error.data = err;
        return callback(error, null);
        //return res.status(400).json({ error: "Error while updating customer address" });
      });
  } catch (err) {
    error.status = 400;
    error.data = err;
    return callback(error, null);
    //return res.status(400).json({ error: err });
  }
}

exports.handle_request = handle_request;
