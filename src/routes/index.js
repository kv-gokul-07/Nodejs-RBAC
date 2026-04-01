const express = require("express");
const authRouter = require("./authRoute");
const userRouter = require("./userRoutes");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", userRouter);

module.exports = router