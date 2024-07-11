const { Router } = require("express");
const plansRoutes = Router();

const { createPlan, getPlans } = require("../controllers/plansControllers/plansController");
// Ruta para crear un nuevo plan
plansRoutes.post("/", createPlan);

// Ruta para obtener todos los planes
plansRoutes.get("/", getPlans);
module.exports = plansRoutes;
