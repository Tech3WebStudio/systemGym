const { User } = require("../../db.js"); // Asegúrate de que la ruta sea correcta

const authMember = async (dni) => {
  // Validar que el DNI sea un número
  if (!/^\d+$/.test(dni)) {
    throw new Error("DNI inválido. Solo se permiten números.");
  }

  // Buscar el usuario en la base de datos por DNI
  const user = await User.findOne({ where: { dni } });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return user;
};

module.exports = authMember;
