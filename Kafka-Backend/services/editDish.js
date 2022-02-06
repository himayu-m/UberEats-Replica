const express = require("express");
const mongoose = require('mongoose');
const Dish = mongoose.model('Dish')

async function handle_request(msg, callback) {
  let response = {};
  let error = {};

    const { dish_id, name, price, desc, category, dietType,dish_image_url } = msg;
    try{
      Dish.findOneAndUpdate({dish_id:dish_id},
        {"$set":{
          dish_name: name,
          dish_price: price,
          dish_desc: desc,
          dish_category: category,
          dish_diet_type:dietType,
          dish_image_url: dish_image_url}})
      .then(result =>{
        console.log(result)
        response.status = 200;
        response.dish = result[0];
        return callback(null, response);
        //return res.status(200).json({ dish: result[0] });
      })
      .catch(err =>{
        console.log("Error occured while querying");
        error.status = 400;
        error.message = "Error occurred while updating favourites";
        error.data = err;
        return callback(error, null);
        //return res.status(400).send("Error occurred while updating favourites");
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