const express = require("express");
const authRouter = express.Router();

const { signup, login } = require("../controllers/booking-controller");
const authMiddleware = require("../middlewares/auth");

authRouter.post("/signup", authMiddleware, signup);
authRouter.post("/login", authMiddleware, login);

module.exports = authRouter;
