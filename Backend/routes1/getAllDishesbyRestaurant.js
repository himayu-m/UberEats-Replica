const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Dish = mongoose.model('Dish')
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.get("/api/getAllDishesByRestId/:restId", checkAuth, async (req, res) => {
    const restId = req.params.restId;
    try{
      Dish.find({restaurantId:restId})
      .then(result =>{
        console.log(result)
        return res.status(200).json({ dishes: result });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while getting dishes");
      })
    }
    catch{(err) => {
      return res.status(400).json({ error: err });
    }}
});

module.exports = router;