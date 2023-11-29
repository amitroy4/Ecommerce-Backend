const express = require('express');
const _ = express.Router();
const registrationController = require("../../controllers/registrationController")
const otpController = require("../../controllers/otpController");
const loginController = require('../../controllers/loginController');

_.post("/registration", registrationController)
_.post("/otpverify", otpController)
_.post("/login", loginController)
// _.get("/registration", function (req, res) {
//     res.send("done")
// })

module.exports = _;