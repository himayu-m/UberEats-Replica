var supertest = require("supertest");
var should = require("should");
const expect = require("chai").expect;

var server = supertest.agent("http://localhost:5000");

describe("LoginTest", function () {
  it("Incorrect Password", () => {
    server
      .post("/api/login")
      .send({ email: "a@a.com", password: "password", role: "Customer" })
      .then(function (res) {
        expect(res.text).to.equal("Password incorrect");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("Customer not registered", () => {
    server
      .post("/api/login")
      .send({ email: "ab@ab.com", password: "123", role: "Customer" })
      .then(function (res) {
        expect(res.text).to.equal("Customer not registered");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("should login", function (done) {
    server
      .post("/api/login")
      .send({ email: "a@a.com", password: "123", role: "Customer" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});

describe("GetCustomerDataById", function () {
  it("should get customer data", function (done) {
    server
      .get("/api/getCustomerDataById/" + 1)
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});

describe("GetRestaurantDataById", function () {
  it("should get restaurant data", function (done) {
    server
      .get("/api/getRestaurantDataById/" + 1)
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});

describe("EditDish", function () {
  it("should edit dish", function (done) {
    server
      .post("/api/editDish")
      .send({
        dish_id: 1,
        name: "Bhel puri",
        price: 5.00,
        desc: "Rice puffs with chutney",
        category: "Salads",
        dietType: "Vegan",
        dish_image_url: "Bhel.jpg"
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});

describe("GetAllOrdersByRestId", function () {
    it("should get all orders by restaurant is", function (done) {
      server
        .get("/api/getAllOrdersByRestId/" + 1)
        .expect(200)
        .end(function (err, res) {
          console.log("Status: ", res.status);
          res.status.should.equal(200);
          done();
        });
    });
  });
