const express = require("express");
const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");

async function handle_request(msg, callback) {
    const restId = msg;
    //const restId = req.params.restId;
    try {
      let response = {};
      let error = {};
      Restaurant.find({restaurant_id:restId})
      .then(result =>{
        console.log(result)
        response.status = 200;
        response.restaurant = result[0];
        return callback(null, response);
        //return res.status(200).json({ restaurant: result[0] });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        error.status = 400;
        error.message = "Error occurred while getting restaurant";
        error.data = err;
        return callback(error, null);
        //return res.status(400).send("Error occurred while getting restaurant");
      })
    }
    catch{(err) => {
      error.status = 400;
      error.data = err;
      return callback(error, null);
      //return res.status(400).json({ error: err });
    }}
}

exports.handle_request = handle_request;