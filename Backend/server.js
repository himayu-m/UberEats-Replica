const conn = require("./config/db_connection");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors({ credentials: true }));

// Connect Database
conn();

// Init Middleware  
app.use(express.json({ extended: false }));

require('./models/customer');
require('./models/dish');
require('./models/order');
require('./models/restaurant');

//Define all the routes
app.use(require("./routes/addDish"));
app.use(require("./routes/cancelOrder"));
app.use(require("./routes/editDish"));
app.use(require("./routes/getAllDishesbyRestaurant"));
app.use(require("./routes/getAllOrdersbyCustomer"));
app.use(require("./routes/getAllOrdersbyRestaurant"));
app.use(require("./routes/getCustomerData"));
app.use(require("./routes/getFavouriteRestaurants"));
app.use(require("./routes/getRestaurantData"));
app.use(require("./routes/getRestaurantDtlsbyCity"));
app.use(require("./routes/login"));
app.use(require("./routes/placeOrder"));
app.use(require("./routes/signup"));
app.use(require("./routes/updateCustOrderStatus"));
app.use(require("./routes/updateCustomerAddress"));
app.use(require("./routes/updateFavourties"));
app.use(require("./routes/updateOverallCustOrderStatus"));
app.use(require("./routes/updateProfile"));
app.use(require("./routes/updateProfilePicture"));
app.use(require("./routes/upload"));


// process.env.NODE_ENV = 'production';

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = process.env.PORT || 5000;
//Server code will be running on port 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));