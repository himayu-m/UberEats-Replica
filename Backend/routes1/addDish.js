const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Restaurant = mongoose.model("Restaurant");
const Dish = mongoose.model('Dish')
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post("/api/addDish", checkAuth, async (req, res) => {
    try {
      Dish.findOne().sort("-dish_id").exec(function (err, dishno) {
          const { restaurant_id, name, price, desc, category, dietType, dish_image_url } = req.body;
          var dishNo = 1;
          if (dishno) 
          dishNo = dishno.dish_id + 1;
          const dishDtls = new Dish({
            dish_id: dishNo,
            dish_name: name,
            dish_price: price,
            dish_desc: desc,
            dish_category: category,
            dish_diet_type:dietType,
            dish_image_url: dish_image_url,
            restaurantId: restaurant_id
          });
          dishDtls.save()
          .then((result) => {
            Restaurant.findOneAndUpdate({restaurant_id:restaurant_id},
              { $push: {dish_list: name, dietaryPreferance: dietType}}
              ).then((result1=>{
                return res.status(200).json({ dish: result1[0] });
              }))
              .catch((err)=>{
                return res.status(400).json({ error: "Error while adding dish to restaurant" + err });
              })
            })
          .catch((err) => {
            return res.status(400).json({ error: "Error while adding dish" + err });
          });
        });
    } catch (err) {
      return res.status(400).json({ error: "errror" });
    }
});

module.exports = router;