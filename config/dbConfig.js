require('dotenv').config()
const mongoose = require('mongoose');

let {USER_NAME,PASSWORD, DATABASE_NAME} = process.env;
function dbConnection() {
    mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.oxq39mj.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`)
        .then(() => console.log('DB Connected!'));
}

module.exports = dbConnection;

// username : amitroyrock6071
// password: Q4AeKB199aWfeMrR