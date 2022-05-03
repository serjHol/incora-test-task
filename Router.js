const Router = require("express");
const router = new Router();
const Controller = require("./Controller.js");
const Authorization = require("./Authorization.js");

router.post("/users", Controller.createUser);
router.post("/login", Authorization.login);
router.get("/users/:id", Authorization.authorizationMiddleware, Controller.getUserById);
router.put("/users/:id", Authorization.authorizationMiddleware, Controller.updateUser)
module.exports = router;