const emailValidation = require("../helpers/emailValidation")
const passwordValidation = require("../helpers/passwordValidation")

const User = require("../model/userSchema")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

let registrationController = async (req, res) => {
    let { name, email, password } = req.body

    let existingUser = await User.find({
        email: email
    })

    if (existingUser.length == 0) {
        if (!name) {
            res.send("Name required")
        } else if (!email) {
            res.send("Email required")
        } else if (!password) {
            res.send("Password required")
        } else {
            if (email) {
                if (!emailValidation(email)) {
                    return res.send("Valid Email Required")
                }
            }
            if (password) {
                if (!passwordValidation(password)) {
                    return res.send("Strong password Required")
                }
            }

            if (emailValidation(email) && passwordValidation(password)) {
                bcrypt.hash(password, 10, async function (err, hash) {
                    // console.log(hash);
                    let user = new User({
                        name: name,
                        email: email,
                        password: hash
                    })
                    user.save()

                    const transporter = nodemailer.createTransport({
                        service:"gmail",
                        auth: {
                          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                          user: "amitroyrock6071@gmail.com",
                          pass: "uyqs iuqm tldm amhe",
                        },
                      });

                      const info = await transporter.sendMail({
                        from: 'amitroyrock6071@gmail.com', // sender address
                        to: "amitroyrock@gmail.com", // list of receivers
                        subject: "Verify Your Email", // Subject line
                        html: "<b>Hello world?</b>", // html body
                      });


                    res.send(user)
                });

            }

        }
    } else {
        res.send("Email Already Exits")
    }

}

module.exports = registrationController;