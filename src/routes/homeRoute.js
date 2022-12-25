const express = require("express");
const route = express.Router();

const homeController = require('../app/controllers/HomeController');


route.post("/add/OrderDetails", homeController.addOrder);
route.get("/cart", homeController.cart);
route.get("/:id", homeController.interface);
route.get("/", homeController.start);

module.exports = route;

