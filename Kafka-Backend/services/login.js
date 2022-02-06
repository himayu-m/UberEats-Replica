const express = require("express");
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Restaurant = mongoose.model("Restaurant");
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function handle_request(msg, callback) {
  let response = {};
  let error = {};
  const emailId = msg.email;
  const password = msg.password;
  const role = msg.role;
  console.log("loggin in")
  if ("Customer" === role) {
    Customer.findOne({ email: emailId }, async function (err, obj) {
      if (err) {
        console.log("error");
        error.status = 400;
        error.message = "Error ocurred";
        error.data = err;
        return callback(error, null);
        //res.status(400).send("Error ocurred");
      }
      if (obj === null) {
        console.log("Not found");
        error.status = 400;
        error.message = "Customer not registered";
        error.data = err;
        return callback(error, null);
        //res.status(400).send("Customer not registered");
      } else {
        const compRes = await bcrypt.compare(password, obj.password);
        const payload = { _id: obj._id, role: obj.role, user: obj };
        if (compRes) {
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          response.status = 200;
          response.json = "JWT " + token;
          return callback(null, response);
          //return res.status(200).json("JWT " + token);
        } else {
          console.log("incorrect");
          error.status = 400;
          error.message = "Password incorrect";
          error.data = err;
          return callback(error, null);
          //return res.status(400).send("Password incorrect");
        }
      }
    });
  } else if ("Restaurant" === role) {
    Restaurant.findOne({ email: emailId }, async function (err, obj) {
      if (err) {
        console.log("error");
        error.status = 400;
        error.message = "Error ocurred";
        error.data = err;
        return callback(error, null);
        //res.status(400).send("Error ocurred");
      }
      console.log(obj);
      if (obj === null) {
        console.log("Not found");
        error.status = 400;
        error.message = "Restaurant not registered";
        error.data = err;
        return callback(error, null);
        //res.status(400).send("Restaurant not registered");
      } else {
        const compRes = await bcrypt.compare(password, obj.password);
        const payload = { _id: obj._id, role: obj.role, user: obj };
        if (compRes) {
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          console.log("JWT " + token);
          response.status = 200;
          response.json = "JWT " + token;
          return callback(null, response);
          //return res.status(200).json("JWT " + token);
        } else {
          console.log("incorrect");
          error.status = 400;
          error.message = "Password incorrect";
          error.data = err;
          return callback(error, null);
          //return res.status(400).send("Password incorrect");
        }
      }
    });
  }
}

exports.handle_request = handle_request;
