const { User } = require("../../db.js");

const getUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

module.exports = getUsers;
