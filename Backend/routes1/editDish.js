const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");
const Dish = mongoose.model('Dish')
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post("/api/editDish", checkAuth, async (req, res) => {
    const { dish_id, name, price, desc, category, dietType,dish_image_url } = req.body;
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
        return res.status(200).json({ dish: result[0] });
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