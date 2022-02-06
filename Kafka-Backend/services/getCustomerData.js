const express = require("express");
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

async function handle_request(msg, callback) {
    
    const custId = msg;
    //const custId = req.params.custId;
    try {
      let response = {};
      let error = {};
      Customer.find({customer_id:custId})
      .then(result =>{
        console.log(result[0])
        response.status = 200;
        response.customer = result[0];
        return callback(null, response);
        //return res.status(200).json({ customer: result[0] });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        error.status = 400;
        error.message = "Error occurred while updating the customer profile";
        error.data = err;
        return callback(error, null);
        //return res.status(400).send("Error occurred while updating the customer profile");
      })
    }
    catch{(err) => {
      error.status = 400;
      error.message = "Error occurred while updating the customer profile";
      error.data = err;
      return callback(error, null);
      //return res.status(400).json({ error: err });
    }}
}

exports.handle_request = handle_request;