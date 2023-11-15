const express = require('express');
const _ = express.Router();
const registrationController = require("../../controllers/registrationController")

_.post("/registration", registrationController)
// _.get("/registration", function (req, res) {
//     res.send("done")
// })

module.exports = _;