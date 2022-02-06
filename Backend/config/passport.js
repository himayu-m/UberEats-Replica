"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Restaurant = mongoose.model('Restaurant')

// Setup work and export for the JWT passport strategy
function auth() {
    //console.log("auth");
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: secret
    };
    //console.log(JSON.stringify(opts.jwtFromRequest));
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
           
            const role = jwt_payload.role
            console.log("jwt_payload" + jwt_payload);
            if("Customer" === role) {
                Customer.findById(jwt_payload._id, (err, results) => {
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            } else if("Restaurant" === role) {
                Restaurant.findById(jwt_payload._id, (err, results) => {
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            } else {
                callback(null, false);
            }
            
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });