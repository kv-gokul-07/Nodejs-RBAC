const express = require("express");
const { verifyToken , authorize } = require("../middlewares/authMiddleware")
const { usersLists, adminRoute, managerRoute, employeeRoute } = require("../controllers/userController");

const router = express.Router();

//Only Admin accesss this Route
router.get("/user", usersLists);
router.get("/admin", verifyToken, authorize("admin"), adminRoute);
router.get("/manager", verifyToken, authorize("manager"), managerRoute);
router.get("/employee", employeeRoute);

module.exports = router