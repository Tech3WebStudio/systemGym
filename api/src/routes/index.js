const { Router } = require("express");
const router = Router();

const loginRoutes = require("./loginRoutes");
const userRoutes = require("./userRoutes");
const paymentRoutes = require("./paymentRoutes");

router.use("/login", loginRoutes);
router.use("/user", userRoutes);
router.use("/payment", paymentRoutes);


module.exports = router;
