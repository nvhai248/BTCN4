const express = require("express");
const passport = require("passport");
const route = express.Router();

const homeController = require('../app/controllers/LogController');

route.post("/login", passport.authenticate('local', {
    session: false, failureRedirect: "http://localhost:3113/log", failureMessage: "fail!"
}), homeController.postLogin);

module.exports = route;

