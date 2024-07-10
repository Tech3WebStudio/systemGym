const { Class } = require("../../db.js"); // Asegúrate de que sea 'Class' con la mayúscula inicial

const getClasses = async () => {
  const allClass = await Class.findAll();
  return allClass;
};

module.exports = getClasses;
