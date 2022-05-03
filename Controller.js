const bcrypt = require("bcrypt");
const nameValidator = require("./Validators/nameValidator.js");
const emailValidator = require("./Validators/emailValidator.js");
const passwordValidator = require("./Validators/passwordValidator.js");
const phoneValidator = require("./Validators/phoneValidator.js");
const SQLQueries = require("./SQLQueries.js");
const userConstructor = require("./UserConstructor.js");

class Controller {
    async createUser(req, res) {
        try {
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
            let internationalFormatPhone;
            if (phone) {
                internationalFormatPhone = phoneValidator(phone);
                if (!internationalFormatPhone) {
                    return res.status(400).json({
                        message: "Phone number is incorrect",
                    });
                }
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = await SQLQueries.createUser(
                first_name,
                last_name,
                email,
                internationalFormatPhone,
                hashedPassword
            ).then((response) => response?.rows[0]);
            return res.json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    message: "Id is required",
                });
            }
            const user = await SQLQueries.getUserById(id).then(
                (response) => response.rows[0]
            );
            if (!user) {
                return res.status(404).json({
                    message: "User with this id doesn't exists",
                });
            }
            return res.json(userConstructor(user));
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    message: "Id is required",
                });
            }
            const user = await SQLQueries.getUserById(id).then(
                (response) => response.rows[0]
            );
            if (!user) {
                return res.status(404).json({
                    message: "User with this id doesn't exists",
                });
            }
            const { first_name, last_name, email, phone, password } = req.body;
            let hashedPassword;
            if (password) {
                hashedPassword = bcrypt.hashSync(password, 10);
            }
            if (
                (first_name && !nameValidator(first_name)) ||
                (last_name && !nameValidator(last_name))
            ) {
                return res.status(400).json({
                    message: "First name and last name must contain letters only",
                });
            }
            if (!emailValidator(email) && email) {
                return res.status(400).json({
                    message: "email is incorrect",
                });
            }
            if (!passwordValidator(password) && password) {
                return res.status(400).json({
                    message:
                        "Password must be between 8 and 24 characters containing letters or numbers only",
                });
            }
            let internationalFormatPhone;
            if (phone) {
                internationalFormatPhone = phoneValidator(phone);
                if (!internationalFormatPhone) {
                    return res.status(400).json({
                        message: "Phone number is incorrect",
                    });
                }
            }
            console.log(last_name)
            const updatedUser = await SQLQueries.updateUser(
                id,
                first_name || user.first_name,
                last_name || user.last_name,
                email || user.email,
                internationalFormatPhone || user.phone,
                hashedPassword || user.password
            ).then((response) => response.rows[0]);
            return res.json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new Controller();
