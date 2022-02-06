var connection = new require("./kafka/Connection");
const conn = require("./config/db_connection");

// Connect Database
conn();

require('./models/customer');
require('./models/dish');
require('./models/order');
require('./models/restaurant');

//topic files
var addDish = require("./services/addDish");
var cancelOrder = require("./services/cancelOrder");
var editDish = require("./services/editDish");
var getAllDishesbyRestaurant = require("./services/getAllDishesbyRestaurant");
var getAllOrdersbyCustomer = require("./services/getAllOrdersbyCustomer");
var getAllOrdersbyRestaurant = require("./services/getAllOrdersbyRestaurant");
var getCustomerData = require("./services/getCustomerData");
var getFavouriteRestaurants = require("./services/getFavouriteRestaurants");
var getRestaurantData = require("./services/getRestaurantData");
var getRestaurantDtlsbyCity = require("./services/getRestaurantDtlsbyCity");
var login = require("./services/login");
var placeOrder = require("./services/placeOrder");
var signup = require("./services/signup");
var updateCustomerAddress = require("./services/updateCustomerAddress");
var updateCustOrderStatus = require("./services/updateCustOrderStatus");
var updateFavourties = require("./services/updateFavourties");
var updateOverallCustOrderStatus = require("./services/updateOverallCustOrderStatus");
var updateProfile = require("./services/updateProfile");
var updateProfilePicture = require("./services/updateProfilePicture");
//var upload = require("./services/upload");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
            err: err,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        if (err) {
          console.log("error when producer sending data", err);
        } else {
          console.log("producer send", data);
        }
      });
      return;
    });
  });
}

//Topics
handleTopicRequest("addDish_topic", addDish);
handleTopicRequest("cancelOrder_topic", cancelOrder);
handleTopicRequest("editDish_topic", editDish);
handleTopicRequest("getAllDishesbyRestaurant_topic", getAllDishesbyRestaurant);
handleTopicRequest("getAllOrdersbyCustomer_topic", getAllOrdersbyCustomer);
handleTopicRequest("getAllOrdersbyRestaurant_topic", getAllOrdersbyRestaurant);
handleTopicRequest("getCustomerData_topic", getCustomerData);
handleTopicRequest("getFavouriteRestaurants_topic", getFavouriteRestaurants);
handleTopicRequest("getRestaurantData_topic", getRestaurantData);
handleTopicRequest("getRestaurantDtlsByCity_topic", getRestaurantDtlsbyCity);
handleTopicRequest("login_topic", login);
handleTopicRequest("placeOrder_topic", placeOrder);
handleTopicRequest("signup_topic", signup);
handleTopicRequest("updateCustomerAddress_topic", updateCustomerAddress);
handleTopicRequest("updateCustOrderStatus_topic", updateCustOrderStatus);
handleTopicRequest("updateFavourites_topic", updateFavourties);
handleTopicRequest(
  "updateOverallCustOrderStatus_topic",
  updateOverallCustOrderStatus
);
handleTopicRequest("updateProfile_topic", updateProfile);
handleTopicRequest("updateProfilePicture_topic", updateProfilePicture);
//handleTopicRequest("upload", upload);
