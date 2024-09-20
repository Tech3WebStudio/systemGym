const { Plan } = require("../../db");

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes', details: error });
    }
};
module.exports = getPlans

