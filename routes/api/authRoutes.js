const express = require('express');
const _ = express.Router();

_.get("/registration", function (req, res) {
    res.send("done")
})

module.exports = _;