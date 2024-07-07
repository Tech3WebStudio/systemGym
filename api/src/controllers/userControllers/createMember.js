const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const mayuscName = require("../../helpers/mayuscName.js");

const createMember = async (data) => {
  let {
    name,
    lastname,
    email,
    password,
    dni,
    phone,
    role = "user",
  } = data;

  // Verifica que los campos requeridos estén presentes
  if (!name || !lastname || !dni || !email || !password || !phone)
    throw new Error("Incomplete data");

  // Validación del email
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) throw new Error("Invalid Email");

  // Validación de la contraseña
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!regexPassword.test(password)) throw new Error("Invalid Password");

  // Validación del nombre y apellido
  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
  if (!regexName.test(name)) throw new Error("Invalid Name");
  if (!regexName.test(lastname)) throw new Error("Invalid Last Name");

  // Validación del DNI (asegúrate de que dni sea una cadena de texto)
  if (!/^\d+$/.test(dni)) throw new Error("Invalid DNI");
  dni = dni.toString();  // Asegúrate de que el dni se maneje como cadena de texto

  // Verifica si el DNI ya existe
  const existingUserByDni = await User.findOne({
    where: { dni: dni },
  });
  if (existingUserByDni) throw new Error("DNI already exists");

  // Verifica si el email ya existe
  const existingUserByEmail = await User.findOne({
    where: { email },
  });
  if (existingUserByEmail) throw new Error("Email already exists");

  // Encriptación de la contraseña
  const hashPassword = await bcryptjs.hash(password, 10);
  const correctName = mayuscName(name);
  const correctLastname = mayuscName(lastname);

  // Crea el usuario
  const newUser = await User.create({
    name: correctName,
    lastname: correctLastname,
    email,
    password: hashPassword,
    dni,
    phone,
    role,
  });

  return newUser;
};

module.exports = createMember;
