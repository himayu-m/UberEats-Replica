const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

async function handle_request(msg, callback) {
    let response = {};
    let error = {};
    const restId = msg.restaurant_id
    const postsPerPage = msg.postPerPage
    const currentPage = msg.currentPage
    const restOrderStatus = msg.filteredRestOrder
    //const restId = req.params.restId
    try {
        Order.find({ restaurant_id: restId,restOrderStatus:restOrderStatus  }).limit(postsPerPage).skip(postsPerPage*(currentPage-1))
            .then(result => {
              Order.find({ restaurant_id: restId,restOrderStatus:restOrderStatus }).count()
              .then(r1=>{
                response.count = r1;
                response.status = 200;
                response.orderDtls = result;
                return callback(null, response);
              })
              //console.log(result)
              //return res.status(200).json({ orderDtls: result })
            })
            .catch(err => {
                error.status = 400;
                error.message = "Error while fetching order details";
                error.data = err;
                return callback(error, null);
                //return res.status(400).json({ error: "Error while fetching order details" });
            })
    }
    catch (err) {
        error.status = 400;
        error.data = err;
        return callback(error, null);
        //return res.status(400).json({ error: err });
    }
}

exports.handle_request = handle_request;