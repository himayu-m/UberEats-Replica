const express = require("express");
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Restaurant = mongoose.model('Restaurant')

async function handle_request(msg, callback) {
    const custId = msg;
    //const custId = req.params.custId;
  try {
    let response = {};
    let error = {};
    Customer.find({customer_id:custId})
    .then(result =>{
      console.log(result[0].favourites)
      Restaurant.find({restaurant_id:{$in:result[0].favourites}},{restaurant_id:1, name:1, operationalMode:1, dietaryPreference:1, cuisine:1, picture_url:1, _id:0})
      .then(resDtls=>{
        console.log(resDtls)
        response.status = 200;
        response.restaurants = resDtls;
        return callback(null, response);
        //return res.status(200).json({restaurants: resDtls });
      }).catch(err=>{
        console.log("Error occured while querying");
        error.status = 400;
        error.data = err;
        return callback(error, null);
        //return res.status(400).json({ error: err });
      })
    })
    .catch(err =>{
      console.log("Error occured while querying");
      error.status = 400;
      error.data = err;
      return callback(error, null);
      //return res.status(400).json({ error: err });
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