const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post("/api/updateFavourites", checkAuth, async (req, res) => {
    const fav = ([...new Set(req.body.favourites)]);
    const customerId = req.body.customer_id;
    try{
      Customer.findOneAndUpdate({customer_id:customerId},
        {"$set":{favourites:fav}})
      .then(result =>{
        console.log(result)
        return res.status(200).json({ favourites: result });
      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while updating favourites");
      })
    }
    catch{(err) => {
      return res.status(400).json({ error: err });
    }}
});

module.exports = router;