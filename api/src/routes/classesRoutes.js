const { Router } = require("express");
const createClasses = require("../controllers/classesControllers/createClasses");
const getClasses = require("../controllers/classesControllers/getClasses");
const classesRoutes = Router();

classesRoutes.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newClass = await createClasses(data);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

classesRoutes.get('/', async(req, res) => {
    try {
        const classes = await getClasses()
        return res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error:error.message })
    }
})

module.exports = classesRoutes;
