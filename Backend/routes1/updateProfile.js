const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Customer = mongoose.model("Customer");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client")

router.post("/api/updateProfile", checkAuth, async (req, res) => {
  console.log(req.body)
  // console.log("inside update" + req.body.restaurant_id + typeof req.body.role);
  if ("Customer" === req.body.role) {
    const {
      customer_id,
      name,
      email,
      dob,
      city,
      state,
      country,
      nickname,
      phone_no,
    } = req.body;

    try {
      Customer.findOneAndUpdate(
        { customer_id: customer_id },
        {
          $set: {
            name: name,
            email: email,
            dob: dob,
            city: city,
            state: state,
            country: country,
            nickname: nickname,
            phone_no: phone_no,
          },
        }
      )
        .then((result) => {
          return res.status(200).json({ customerDtls: result });
        })
        .catch((err) => {
          return res.status(400).json({
            error: "Error occurred while updating the customer profile",
          });
        });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else if ("Restaurant" === req.body.role) {
    console.log("inside restaurant" + JSON.stringify(req.body));
    const {
      restaurant_id,
      name,
      city,
      email,
      address,
      description,
      phone_no,
      timings,
      cuisine,
      mode,
      diet,
    } = req.body;

    try {
      Restaurant.findOneAndUpdate(
        { restaurant_id: restaurant_id },
        {
          $set: {
            name: name,
            city: city,
            email: email,
            address: address,
            description: description,
            phone_no: phone_no,
            timings: timings,
            cuisine: cuisine,
            operationalMode: mode,
            dietaryPreference: JSON.stringify(diet),
          },
        }
      )
        .then((result) => {
          return res.status(200).json({ restaurantDtls: result });
        })
        .catch((err) => {
          return res.status(400).json({
            error: "Error occurred while updating the restaurant profile",
          });
        });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
});

module.exports = router;




