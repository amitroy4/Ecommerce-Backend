const emailValidation = require("../helpers/emailValidation")
const passwordValidation = require("../helpers/passwordValidation")

const User = require("../model/userSchema")
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator")

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

                    let otp = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
                    console.log(otp);
                    // console.log(hash);
                    let user = new User({
                        name: name,
                        email: email,
                        password: hash,
                        otp: otp,
                    })
                    user.save()


                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                            user: "amitroyrock6071@gmail.com",
                            pass: "uyqs iuqm tldm amhe",
                        },
                    });

                    const info = await transporter.sendMail({
                        from: process.env.BASE_EMAIL, // sender address
                        to: email, // list of receivers
                        subject: "Verify Your Email", // Subject line
                        html: `'<b>Please verify by clicking this <a href="https://www.facebook.com/amitroy.ewu/">link</a> or OTP ${otp} </b>'`, // html body
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