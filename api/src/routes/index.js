const { Router } = require("express");
const router = Router();

const loginRoutes = require("./loginRoutes");
const userRoutes = require("./userRoutes");
const paymentRoutes = require("./paymentRoutes");
const classesRoutes = require("./classesRoutes");
const plansRoutes = require("./plansRoutes");

router.use("/login", loginRoutes);
router.use("/user", userRoutes);
router.use("/payment", paymentRoutes);
router.use("/classes", classesRoutes);
router.use("/plans", plansRoutes);


module.exports = router;
