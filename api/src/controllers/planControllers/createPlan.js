const { Plan } = require("../../db");

// Crear un nuevo plan
const createPlan = async (req, res) => {
    try {
        const { name, price, expirationDate } = req.body;
        const newPlan = await Plan.create({ name, price, expirationDate });
        res.status(201).json(newPlan);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el plan', details: error });
    }
};
module.exports =  createPlan;


