const express = require('express');
const getPlans = require('../controllers/planControllers/getPlans');
const deletePlan  = require('../controllers/planControllers/deletePlan');
const updatePlan   = require('../controllers/planControllers/updatePlan');
const createPlan= require('../controllers/planControllers/createPlan');
const getPlanById = require('../controllers/planControllers/getPlanById');
const validateFamilyPlan = require("../controllers/planControllers/validatePlanFamiliar")

const planRouter = express.Router();

// Rutas CRUD para los planes
planRouter.post('/', createPlan); 
planRouter.post('/validateFamilyPlan', validateFamilyPlan);       // Crear un nuevo plan
planRouter.get('/', getPlans);           // Obtener todos los planes
planRouter.get('/:id', getPlanById);     // Obtener un plan por ID
planRouter.put('/:id', updatePlan);      // Actualizar un plan por ID
planRouter.delete('/:id', deletePlan);   // Eliminar un plan por ID

module.exports = planRouter;
