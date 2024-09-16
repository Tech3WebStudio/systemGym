const { User } = require("../../db.js");

const getUserById = async (idUser) => {
  const userById = await User.findByPk(idUser);
  return userById;
};

module.exports = getUserById;
