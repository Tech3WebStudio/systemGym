const { Router } = require("express");
const paymenRoutes = Router();
const createOrder = require("../controllers/paymentControllers/createOrder.js");


paymenRoutes.get('/create-order', createOrder)

module.exports = paymenRoutes;