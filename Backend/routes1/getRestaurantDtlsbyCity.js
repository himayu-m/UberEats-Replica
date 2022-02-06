const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");
const Dish = mongoose.model('Dish')
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getRestaurantDtlsByCity/", checkAuth, async (req, res) => {
  try{
    const city = req.query.city ? req.query.city : '';
    if(city) {
      console.log("city exists");
      Restaurant.find({city:city})
      .then(result =>{
      console.log(result)
      return res.status(200).json({ restaurant: result });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while getting restaurants by city");
      })
    } 
    else {
      console.log("city does not exist");
      Restaurant.find({})
      .then(result =>{
        console.log(result)
        return res.status(200).json({ restaurant: result });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while getting restaurants by city");
      })
    }
  }
  catch{(err) => {
    return res.status(400).json({ error: err });
  }}
});

module.exports = router;