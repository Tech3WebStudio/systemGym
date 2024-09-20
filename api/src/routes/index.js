const { Router } = require("express");
const router = Router();

const loginRoutes = require("./loginRoutes");
const userRoutes = require("./userRoutes");
const paymentRoutes = require("./paymentRoutes");
const planRouter = require("./planRoutes")


router.use("/login", loginRoutes);
router.use("/user", userRoutes);
router.use("/payment", paymentRoutes);
router.use('/plan', planRouter); // Usamos las rutas de planes

module.exports = router;
