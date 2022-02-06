const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getRestaurantDataById/:restId", checkAuth, async (req, res) => {
    const restId = req.params.restId;
    try{
      Restaurant.find({restaurant_id:restId})
      .then(result =>{
        console.log(result)
        return res.status(200).json({ restaurant: result[0] });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while getting restaurant");
      })
    }
    catch{(err) => {
      return res.status(400).json({ error: err });
    }}
});

module.exports = router;