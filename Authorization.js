const bcrypt = require("bcrypt");
const SQLQueries = require("./SQLQueries.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const userConstructor = require("./UserConstructor.js");
class Authorization {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                return res.json(400).json({ message: "email and password are required" });
            }
            const user = await SQLQueries.getUserByEmail(email).then(
                (response) => response.rows[0]
            );
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "User with this email doesn't exist" });
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Wrong password" });
            }
            const payload = { id: user.id };
            const token = jwt.sign(payload, "Some_secret");
            return res.json({ token, user: userConstructor(user) });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
    async authorizationMiddleware(req, res, next) {
        try {
            const token = req.headers?.authorization?.split(" ")[1];

            if (!token) {
                return res.status(403).json({ message: "User didn't authorize" });
            }
            const decodedToken = jwt.verify(token, "Some_secret");
            if (!decodedToken) {
                return res.status(403).json({ message: "Authorization failed" });
            }
            req.id = decodedToken.id;

            next();
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new Authorization();
