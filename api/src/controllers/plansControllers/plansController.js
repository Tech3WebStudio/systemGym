const { Plans } = require('../../db');

// Controlador para crear un nuevo plan
const createPlan = async (req, res) => {
  try {
    const { nombre, descripcion, precio, dias, condiciones } = req.body;

    // Validar los datos antes de crear el plan
    if (!nombre || !descripcion || !precio || !dias || !condiciones) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newPlan = await Plans.create({
      nombre,
      descripcion,
      precio,
      dias,
      condiciones
    });

    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los planes
const getPlans = async (req, res) => {
  try {
    const plans = await Plans.findAll();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlan,
  getPlans
};
