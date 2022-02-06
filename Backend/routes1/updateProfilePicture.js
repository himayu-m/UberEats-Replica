const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Customer = mongoose.model("Customer");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post("/api/updateProfilePicture", checkAuth, (req, res) => {
    if ("Customer" === req.body.role) {
      const { customer_id, picture_name} = req.body;
      try {
        Customer.findOneAndUpdate({ customer_id: customer_id },
          {$set: {picture_url: picture_name}})
          .then((result) => {
            return res.status(200).json({ customerDtls: result });
          })
          .catch((err) => {
            return res.status(400).json({error:"Error occurred while updating the customer profile picture",});
          });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    } else if ("Restaurant" === req.body.role) {
      const { restaurant_id, picture_name} = req.body;
      try {
        Restaurant.findOneAndUpdate({ restaurant_id: restaurant_id },
          {$set: {picture_url: picture_name}})
          .then((result) => {
            return res.status(200).json({ customerDtls: result });
          })
          .catch((err) => {
            return res.status(400).json({error:"Error occurred while updating the restaurant profile picture"});
          });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    }
});

module.exports = router;