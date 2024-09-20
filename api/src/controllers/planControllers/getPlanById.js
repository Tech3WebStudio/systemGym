const { Plan } = require("../../db");

// Obtener un plan por su ID
const getPlanById = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findByPk(id);
        if (plan) {
            res.status(200).json(plan);
        } else {
            res.status(404).json({ error: 'Plan no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el plan', details: error });
    }
};
module.exports = getPlanById;
