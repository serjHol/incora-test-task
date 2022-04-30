const Router = require("express");
const router = new Router();
const Controller = require("./Controller.js");

router.post("/users", Controller.createUser)

module.exports = router;