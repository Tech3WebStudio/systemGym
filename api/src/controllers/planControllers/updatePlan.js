const { Plan } = require("../../db");

const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, expirationDate } = req.body;
        const plan = await Plan.findByPk(id);
        if (plan) {
            plan.name = name || plan.name;
            plan.price = price || plan.price;
            plan.expirationDate = expirationDate || plan.expirationDate;
            await plan.save();
            res.status(200).json(plan);
        } else {
            res.status(404).json({ error: 'Plan no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el plan', details: error });
    }
};
module.exports = updatePlan;

