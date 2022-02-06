"use strict";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Restaurant = mongoose.model("Restaurant");
const bcrypt = require("bcryptjs");

router.post("/api/signup", (req, res) => {
  try {
    const name = req.body.name;
    const emailId = req.body.email;
    const pwd = req.body.password;
    const role = req.body.role;
    const city = req.body.city;

    if ("Customer" === role) {
      Customer.findOne({ email: emailId }, async function (err, obj) {
        if (err) {
          res.status(400).send("Unknown error occured");
        }
        if (obj) {
          console.log("already registered");
          res.status(400).send("Customer already registered with this emailId");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPwd = await bcrypt.hash(pwd, salt);

          Customer.findOne().sort("-customer_id").exec(function (err, custId) {
            var customerId = 1;
          if (custId) 
          customerId = custId.customer_id + 1;
            
          const customer = new Customer({
            customer_id: customerId,
            name,
            email: emailId,
            password: hashPwd,
            role
          });
          customer
            .save()
            .then((result) => {
              res.status(200).json({ customerDtl: result });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send("Error while saving the customer object");
            });
          });
          
        }
      });
    } else if ("Restaurant" === role) {
      Restaurant.findOne({ email: emailId }, async function (err, obj) {
        if (err) {
          res.status(400).send("Unknown error occured");
        }
        if (obj) {
          console.log("already registered");
          res
            .status(400)
            .send("Restaurant already registered with this emailId");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPwd = await bcrypt.hash(pwd, salt);
          
          Restaurant.findOne().sort("-restaurant_id").exec(function (err, restId) {
            var restaurantId = 1;
            if (restId) 
            restaurantId = restId.restaurant_id + 1;

            const restaurant = new Restaurant({
              restaurant_id: restaurantId,
              name,
              email: emailId,
              password: hashPwd,
              city,
              role
            });
            console.log("inserted" + restaurantId);
            restaurant.save()
              .then((result) => {
                return res.status(200).json({ restaurantDtl: result });
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).send("Error while saving the restaurant object");
              });
          });
          
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while registering");
  }
});

module.exports = router;