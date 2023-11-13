const express = require('express')
const app = express();
const dbConnection = require("./config/dbConfig")
app.use(express.json());
dbConnection()

app.listen(8000, function () {
    console.log("server is running");
})



