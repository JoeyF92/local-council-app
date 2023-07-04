const { Router } = require("express");
const authenticator = "./middleware/authenticator";

const userController = require("../controllers/user.js");
const authenticator = require("../middleware/authenticator.js")

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/logout", userController.logout);


module.exports = userRouter;
