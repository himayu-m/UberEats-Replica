const express = require("express");
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Dish = mongoose.model("Dish");

async function handle_request(msg, callback) {
  let response = {};
  let error = {};

  try {
    Dish.findOne()
      .sort("-dish_id")
      .exec(function (err, dishno) {
        const {
          restaurant_id,
          name,
          price,
          desc,
          category,
          dietType,
          dish_image_url,
        } = msg;
        var dishNo = 1;
        if (dishno) dishNo = dishno.dish_id + 1;
        const dishDtls = new Dish({
          dish_id: dishNo,
          dish_name: name,
          dish_price: price,
          dish_desc: desc,
          dish_category: category,
          dish_diet_type: dietType,
          dish_image_url: dish_image_url,
          restaurant_id: restaurant_id,
        });
        dishDtls
          .save()
          .then((result) => {
            Restaurant.findOneAndUpdate(
              { restaurant_id: restaurant_id },
              { $push: { dish_list: name, dietaryPreferance: dietType } }
            )
              .then((result1) => {
                response.status = 200;
                response.dish = result1[0];
                return callback(null, response);
                //return res.status(200).json({ dish: result1[0] });
              })
              .catch((err) => {
                error.status = 400;
                error.message = "Error while adding dish to restaurant";
                error.data = err;
                return callback(error, null);
                //return res.status(400).json({ error: "Error while adding dish to restaurant" + err });
              });
          })
          .catch((err) => {
            error.status = 400;
            error.message = "Error while adding dish";
            error.data = err;
            return callback(error, null);
            //return res.status(400).json({ error: "Error while adding dish" + err });
          });
      });
  } catch (err) {
    error.status = 400;
    error.message = "error";
    error.data = err;
    return callback(error, null);
    //return res.status(400).json({ error: "errror" });
  }
}

exports.handle_request = handle_request;
