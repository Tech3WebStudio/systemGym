const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const mayuscName = require("../../helpers/mayuscName.js");

const postUser = async (data) => {
  let { name, email, uid, role = "admin" } = data;

  if (!name || !email) throw new Error("Incomplete data");

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) throw new Error("Invalid Email");

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚxñÑ\s'-]+$/;
  if (!regexName.test(name)) throw new Error("Invalid Name");

  const correctName = mayuscName(name);
  name = correctName;

  // Buscamos el usuario por email
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("The email is already associated with an account");
  }

  // Creamos el nuevo usuario
  const newUser = await User.create({
    name,
    email,
    role,
    token: uid,
  });

  return newUser;
};

module.exports = postUser;
