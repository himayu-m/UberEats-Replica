const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

async function handle_request(msg, callback) {
    let response = {};
    let error = {};
    const custId = msg.customer_id
    const postsPerPage = msg.postPerPage
    const currentPage = msg.currentPage
    const custOrderStatus = msg.filteredCustOrder
    //console.log("hello",custOrderStatus)
    //const custId = req.params.custId
    try {
        Order.find({ customer_id: custId, custOrderStatus:custOrderStatus }).limit(postsPerPage).skip(postsPerPage*(currentPage-1))
            .then(result => {
                Order.find({ customer_id: custId, custOrderStatus:custOrderStatus }).count()
                .then(r1=>{
                    response.count = r1;
                    response.status = 200;
                    response.orderDtls = result;
                    return callback(null, response);
                })

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