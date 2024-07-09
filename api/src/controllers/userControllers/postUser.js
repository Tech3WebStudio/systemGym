const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const mayuscName = require("../../helpers/mayuscName.js");

const postUser = async (data) => {
  let {
    name,
    email,
    password,
    role = "admin" // Asigna el rol por defecto como "user" si no se proporciona
  } = data;

  // Verifica que los campos requeridos estén presentes
  if (!name || !email || !password) throw new Error("Incomplete data");

  // Validación del email
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) throw new Error("Invalid Email");

  // Validación de la contraseña
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!regexPassword.test(password)) throw new Error("Invalid Password");

  // Validación del nombre
  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚxñÑ\s'-]+$/;
  if (!regexName.test(name)) throw new Error("Invalid Name");

  // Encriptación de la contraseña
  const hashPassword = await bcryptjs.hash(password, 10);
  const correctName = mayuscName(name);
  name = correctName;

  // Crea el usuario si no existe
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: hashPassword,
      role,
    },
  });

  if (created) return newUser;
  else {
    throw new Error("The email is already associated with an account");
  }
};

module.exports = postUser;
