let User = require("../model/userSchema")
const bcrypt = require('bcrypt');

let loginController = async (req, res) => {
    let { email, password } = req.body
    let existingUser = await User.find({ email: email })
    // console.log(existingUser[0]);
    if (existingUser.length == 0) {
        res.send({ error: "credencial does not match" })
    } else {
        bcrypt.compare(password, existingUser[0].password, function (err, result) {
            //    console.log(result);
            if (result) {
                res.send({ error: "login Successful" })
            } else {
                res.send({ error: "credencial does not match" })
            }
        });
    }
}

module.exports = loginController