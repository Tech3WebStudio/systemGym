const { Plan } = require("../../db");

const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findByPk(id);
        if (plan) {
            await plan.destroy();
            res.status(200).json({ message: 'Plan eliminado' });
        } else {
            res.status(404).json({ error: 'Plan no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el plan', details: error });
    }
};
module.exports =  deletePlan;
