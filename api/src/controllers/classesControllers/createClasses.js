const { Class } = require("../../db.js");

const createClasses = async (data) => {
  try {
    const { nombre, precio, plan, dias } = data;

    const newClass = await Class.create({
      nombre: nombre,
      precio: precio,
      plan: plan,
      dias: dias,
    });
    return newClass;
  } catch (error) {
    throw new Error("Error creating class: " + error.message);
  }
};

module.exports = createClasses;
