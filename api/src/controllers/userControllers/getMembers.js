const { User } = require("../../db.js"); // Asegúrate de que sea 'User' con la mayúscula inicial

const getMembers = async () => {
  const allUsers = await User.findAll({
    where: { role: "user", isActive: true }, // Cambiado 'rol' a 'role'
  });
  return allUsers;
};

module.exports = getMembers;
