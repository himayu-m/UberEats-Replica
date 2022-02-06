"use strict";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Restaurant = mongoose.model("Restaurant");
const { auth } = require("../config/passport");
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var kafka = require("../kafka/client")
auth();

router.post("/api/login", (req, res) => {
  const emailId = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  if ("Customer" === role) {
    Customer.findOne({ email: emailId }, async function (err, obj) {
      if (err) {
        console.log("error");
        res.status(400).send("Error ocurred");
      }
      if (obj === null) {
        console.log("Not found");
        res.status(400).send("Customer not registered");
      } else {
        const compRes = await bcrypt.compare(password, obj.password);
        const payload = { _id: obj._id, role: obj.role, user: obj };
        if (compRes) {
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          return res.status(200).json("JWT " + token);
        } else {
          console.log("incorrect");
          return res.status(400).send("Password incorrect");
        }
      }
    });
  } else if ("Restaurant" === role) {
    Restaurant.findOne({ email: emailId }, async function (err, obj) {
      if (err) {
        console.log("error");
        res.status(400).send("Error ocurred");
      }
      console.log(obj);
      if (obj === null) {
        console.log("Not found");
        res.status(400).send("Restaurant not registered");
      } else {
        const compRes = await bcrypt.compare(password, obj.password);
        const payload = { _id: obj._id, role: obj.role, user: obj };
        if (compRes) {
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          console.log("JWT " + token);
          return res.status(200).json("JWT " + token);
        } else {
          console.log("incorrect");
          return res.status(400).send("Password incorrect");
        }
      }
    });
  }
});

module.exports = router;
