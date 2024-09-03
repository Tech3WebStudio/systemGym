const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const mayuscName = require("../../helpers/mayuscName.js");

const postUser = async (data) => {
  let { name, email, password, role = "admin" } = data;

  if (!name || !email || !password) throw new Error("Incomplete data");

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) throw new Error("Invalid Email");

  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!regexPassword.test(password)) throw new Error("Invalid Password");

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚxñÑ\s'-]+$/;
  if (!regexName.test(name)) throw new Error("Invalid Name");

  const hashPassword = await bcryptjs.hash(password, 10);
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
    password: hashPassword,
    role,
  });

  return newUser;
};


module.exports = postUser;
