const bcrypt = require("bcrypt");
const geoip = require('geoip-country');
const nameValidator = require("./Validators/nameValidator.js");
const emailValidator = require("./Validators/emailValidator.js");
const passwordValidator = require("./Validators/passwordValidator.js");
const phoneValidator = require("./Validators/phoneValidator.js");
class Controller {
    async createUser(req, res) {
        try {
            const ip =
                req.headers["x-forwarded-for"]?.split(",").shift() ||
                req.socket?.remoteAddress;
            const { first_name, last_name, email, phone, password } = req.body;
            if (!(first_name && email && password)) {
                return res
                    .status(400)
                    .json({ message: "first_name, email and password are required" });
            }

            if (!nameValidator(first_name) || (last_name && !nameValidator(last_name))) {
                return res.status(400).json({
                    message: "First name and last name must contain letters only",
                });
            }
            if (!emailValidator(email)) {
                return res.status(400).json({
                    message: "email is incorrect",
                });
            }
            if (!passwordValidator(password)) {
                return res.status(400).json({
                    message:
                        "Password must be between 8 and 24 characters containing letters or numbers only",
                });
            }
            if (phone && !phoneValidator(phone)) {
                return res.status(400).json({
                    message: "Phone number is incorrect",
                });
            }
            const country  = geoip.lookup(ip).country;
            return res.json(country);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new Controller();
