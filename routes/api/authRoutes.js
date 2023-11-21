const express = require('express');
const _ = express.Router();
const registrationController = require("../../controllers/registrationController")
const otpController = require("../../controllers/otpController")

_.post("/registration", registrationController)
_.post("/otpverify", otpController)
// _.get("/registration", function (req, res) {
//     res.send("done")
// })

module.exports = _;