const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Restaurant = mongoose.model('Restaurant')
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getFavouriteRestaurants/:custId", checkAuth, async (req, res) => {
  const custId = req.params.custId;
  try{
    Customer.find({customer_id:custId})
    .then(result =>{
      console.log(result[0].favourites)
      Restaurant.find({restaurant_id:{$in:result[0].favourites}},{restaurant_id:1, name:1, operationalMode:1, dietaryPreference:1, cuisine:1, picture_url:1, _id:0})
      .then(resDtls=>{
        console.log(resDtls)
        return res.status(200).json({restaurants: resDtls });
      }).catch(err=>{
        console.log("Error occured while querying");
        return res.status(400).json({ error: err });
      })
    })
    .catch(err =>{
      console.log("Error occured while querying");
      return res.status(400).json({ error: err });
    })
  }
  catch{(err) => {
    return res.status(400).json({ error: err });
  }}
});

module.exports = router;